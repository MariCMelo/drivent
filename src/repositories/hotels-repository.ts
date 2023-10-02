import { prisma } from '@/config';


async function getHotels() {
    const result = await prisma.hotel.findMany()
    return result
    
}

async function getHotelRooms() {
    
}

export const hotelsRepository = {
    getHotelRooms,
    getHotels 
};