import { notFoundError } from "@/errors";
import { hotelsRepository } from "@/repositories/hotels-repository";

async function getAllHotels() {
    const hotels = await hotelsRepository.getHotels()
    return hotels
}

async function getHotelRooms(hotelId: number) {
    const room = await hotelsRepository.getHotelRooms(hotelId);
    if(!room) throw notFoundError();

    return room;
}

export const hotelsService = {
    getAllHotels,
    getHotelRooms
};