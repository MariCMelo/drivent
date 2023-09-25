import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import { enrollmentRepository } from '@/repositories';
import { ticketsRepository } from '@/repositories/tickets-repository';

async function getTicketsTypes() {
  const tickets = await ticketsRepository.getTicketsTypes();
  return tickets;
}

async function getUserTicket(userId: number) {
  const enrollment = await enrollmentRepository.getEnrollment(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.getTicketWithUser(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function createUserTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.getEnrollment(userId);
  if (!enrollment) throw notFoundError();

  const ticketFormated = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  const ticket = await ticketsRepository.createUserTicket(ticketFormated);
  return ticket;
}

export const ticketService = {
  createUserTicket,
  getTicketsTypes,
  getUserTicket,
};
