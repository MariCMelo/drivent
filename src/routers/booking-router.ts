import { getBooking } from "@/controllers/booking-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
    .all('/*', authenticateToken, getBooking)
    .get('/',)
    .post('/',)
    .put('/:bookingId');

export { bookingRouter };
