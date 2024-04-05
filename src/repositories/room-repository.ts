import { prisma } from '@/config';

async function findAllHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: { hotelId },
  });
}

async function findId(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
  });
}

export const roomRepository = {
  findAllHotelId,
  findId
};