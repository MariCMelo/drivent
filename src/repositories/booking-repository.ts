import { prisma } from "@/config";

async function findBooking() {console.log("bateu repo")
    return prisma.booking.findMany({
        select: {
            id: true,
            Room: {
                select: {
                    id: true,
                    name: true,
                    capacity: true,
                    hotelId: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    })
}
export const bookingRepository = {
    findBooking
};
