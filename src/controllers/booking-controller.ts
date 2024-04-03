import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";


async function getBooking(req: AuthenticatedRequest, res: Response){}

async function postBooking(req: AuthenticatedRequest, res: Response){}

async function putBooking(req: AuthenticatedRequest, res: Response){}



export const bookingController = {
    getBooking,
    postBooking,
    putBooking
}