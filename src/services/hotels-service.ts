import { hotelsRepository } from "@/repositories/hotels-repository";

async function getAllHotels() {
    const hotels = await hotelsRepository.getHotels()
    return hotels
}

async function getHotelRooms() {
    const room = await hotelsRepository.getHotelRooms()
}

export const hotelsService = {
    getAllHotels,
    getHotelRooms
};