import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createHotel() {
    return prisma.hotel.create({
        data: {
            name: faker.name.findName(),
            image: faker.image.imageUrl(),
        }
    })
}

export async function createRoom() {
    return prisma.room.create({
        data: {
            name: faker.name.findName(),
            capacity: faker.datatype.number(),
            hotelId: faker.datatype.number(),
        }
    })
}