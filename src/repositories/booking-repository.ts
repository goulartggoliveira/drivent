import { prisma } from "@/config";
import { CreateBookingParams, UpdateBookingParams } from "@/protocols";

async function findUserId(userId: number){
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
      });
}

async function create({ roomId, userId }: CreateBookingParams) {
    return prisma.booking.create({
      data: { roomId, userId },
    });
  }
  
  async function findRoomId(roomId: number) {
    return prisma.booking.findMany({
      where: { roomId },
      include: { Room: true },
    });
  }

  async function upsertBooking({ id, roomId, userId }: UpdateBookingParams) {
    return prisma.booking.upsert({
      where: { id },
      create: { roomId, userId },
      update: { roomId },
    });
  }

export const bookingRepository = {
    findUserId,
    create,
    findRoomId,
    upsertBooking
}