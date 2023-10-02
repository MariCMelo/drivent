import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
    console.log("bateu no controller")
  const hotels = await hotelsService.getAllHotels();
  return res.status(httpStatus.OK).send(hotels);
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
    const rooms = await hotelsService.getHotelRooms()
    return res.status(httpStatus.OK).send(rooms)
}