import { prisma } from "@/config";

async function findUserId(userId: number){
    return prisma.booking.findFirst({
        where: { userId },
        include: { Room: true },
      });
}

export const bookingRepository = {
    findUserId
}