import { AuthenticatedRequest } from "@/middlewares";
import { bookingService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";


export async function getBooking(req: AuthenticatedRequest, res: Response){
    const { userId } = req;
    const booking = await bookingService.getBooking(userId);
  
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
}

async function postBooking(req: AuthenticatedRequest, res: Response){

    const { userId } = req;
    const roomId = Number(req.body.roomId);
  
    const booking = await bookingService.bookRoomId(userId, roomId);
  
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
}

async function putBooking(req: AuthenticatedRequest, res: Response){

    const { userId } = req;
  const roomId = Number(req.body.roomId);

  const booking = await bookingService.changeBookingRoomId(userId, roomId);

  return res.status(httpStatus.OK).send({ bookingId: booking.id });

}



export const bookingController = {
    getBooking,
    postBooking,
    putBooking
}