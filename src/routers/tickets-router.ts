import { Router } from 'express';
import { createUserTicket, getAllTicketsType, getUserTicket } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken)

ticketsRouter
    .get('/types', getAllTicketsType)
    .get('/', getUserTicket)
    .post('/', createUserTicket);

export { ticketsRouter };
