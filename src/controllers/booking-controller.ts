import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  console.log("bateu controller")
    const { userId } = req;
console.log(userId)

  const booking = await bookingService.getBooking();
  res.status(httpStatus.OK).send(booking);
}

