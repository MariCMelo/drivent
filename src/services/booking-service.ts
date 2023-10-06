import { notFoundError } from '@/errors';
import { bookingRepository } from '@/repositories/booking-repository';
import { hotelsService } from './hotels-service';
import { hotelRepository } from '@/repositories';

async function getBooking() {
  console.log('bateu no serv');
// await hotelsService.validateUserBooking(userId)

  const booking = await bookingRepository.findBooking();
  console.log(booking);
  if (booking.length === 0) throw notFoundError();

  return booking;
}

export const bookingService = {
  getBooking,
};
