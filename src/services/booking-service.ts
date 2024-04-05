import { cannotBookError, notFoundError } from "@/errors"
import { bookingRepository, enrollmentRepository, roomRepository, ticketsRepository } from "@/repositories"
import { TicketStatus } from "@prisma/client"


async function getBooking(userId: number){
  const booking = await bookingRepository.findUserId(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function validateUserBooking(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw cannotBookError();
  
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();
  
    const type = ticket.TicketType;
  
    if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
      throw cannotBookError();
    }
  }
  
  async function checkValidBooking(roomId: number) {
    const room = await roomRepository.findId(roomId);
    if (!room) throw notFoundError();
  
    const bookings = await bookingRepository.findRoomId(roomId);
    if (room.capacity <= bookings.length) throw cannotBookError();
  }

  async function bookRoomId(userId: number, roomId: number) {
    await validateUserBooking(userId);
    await checkValidBooking(roomId);
  
    return bookingRepository.create({ roomId, userId });
  }
  
  async function changeBookingRoomId(userId: number, roomId: number) {
    if (!roomId) throw notFoundError();
  
    await checkValidBooking(roomId);
    const booking = await bookingRepository.findUserId(userId);
  
    if (!booking || booking.userId !== userId) throw cannotBookError();
  
    return bookingRepository.upsertBooking({
      id: booking.id,
      roomId,
      userId,
    });
  }

export const bookingService = {
    getBooking,
    bookRoomId,
    changeBookingRoomId
}