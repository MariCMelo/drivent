import { Address, Enrollment } from "@prisma/client";
import { request } from "@/utils/request";
import { invalidDataError, notFoundError } from "@/errors";
import {
  addressRepository,
  CreateAddressParams,
  enrollmentRepository,
  CreateEnrollmentParams,
} from "@/repositories";
import { exclude } from "@/utils/prisma-utils";

type cpfInfo = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

async function cpfValidation(cep: string) {
  const response = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
  if (response.status === 200) {
    if (response.data.erro === true) {
      throw invalidDataError("CEP válido, mas inexistente");
    }
  } else if (response.status === 400) {
    throw invalidDataError("Formato inválido");
  }
  return response.data;
}
async function getAddressFromCEP(cep: string) {
  const cpfData = await cpfValidation(cep);

  const addressData: cpfInfo = {
    logradouro: cpfData.logradouro,
    complemento: cpfData.complemento,
    bairro: cpfData.bairro,
    cidade: cpfData.localidade,
    uf: cpfData.uf,
  };

  return addressData;
}

// TODO: Tratar regras de negócio e lanças eventuais erros

async function getOneWithAddressByUserId(
  userId: number
): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress =
    await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(
      enrollmentWithAddress,
      "userId",
      "createdAt",
      "updatedAt",
      "Address"
    ),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<
  Enrollment,
  "userId" | "createdAt" | "updatedAt"
>;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, "createdAt", "updatedAt", "enrollmentId");
}

type GetAddressResult = Omit<
  Address,
  "createdAt" | "updatedAt" | "enrollmentId"
>;

async function createOrUpdateEnrollmentWithAddress(
  params: CreateOrUpdateEnrollmentWithAddress
) {
  const enrollment = exclude(params, "address");
  enrollment.birthday = new Date(enrollment.birthday);
  const address = getAddressForUpsert(params.address);

  // TODO - Verificar se o CEP é válido antes de associar ao enrollment.
  await cpfValidation(params.cpf);

  const newEnrollment = await enrollmentRepository.upsert(
    params.userId,
    enrollment,
    exclude(enrollment, "userId")
  );

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

export const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP,
  cpfValidation,
};
