import { Router } from 'express';
import { createUserTicket, getAllTicketsType, getUserTicket } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.get('/types', getAllTicketsType).get('/', getUserTicket).post('/', createUserTicket);

export { ticketsRouter };
