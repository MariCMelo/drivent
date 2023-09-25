import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketService } from '@/services/tickets-service';
import { invalidDataError } from '@/errors';

export async function getAllTicketsType(req: AuthenticatedRequest, res: Response) {
  const tickets = await ticketService.getTicketsTypes();

  res.status(httpStatus.OK).send(tickets);
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticket = await ticketService.getUserTicket(userId);

  res.status(httpStatus.OK).send(ticket);
}

export async function createUserTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  if (!ticketTypeId) throw invalidDataError('needs Ticket Type')
  const result = await ticketService.createUserTicket(ticketTypeId, userId);

  res.status(httpStatus.CREATED).send(result);
}
