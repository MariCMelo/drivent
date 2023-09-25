import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

export type CreateTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTicketsTypes() {
  const result = await prisma.ticketType.findMany();
  return result;
}

async function getTicketWithUser(id: number) {
  return await prisma.ticket.findUnique({
    where: {
      enrollmentId: id,
    },
    include: {
      TicketType: true,
    },
  });
}

async function createUserTicket(tickets: CreateTicket) {
  const newTicket = await prisma.ticket.create({
    data: {
      ...tickets,
    },
    include: {
      TicketType: true,
    },
  });

  return newTicket;
}

export const ticketsRepository = {
  createUserTicket,
  getTicketsTypes,
  getTicketWithUser,
};
