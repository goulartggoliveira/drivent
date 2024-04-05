import { bookingController, getBooking } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { bookingSchema } from "@/schemas";
import { Router } from "express";


const bookingRouter = Router()

bookingRouter
.all('/*', authenticateToken)
.get('/', getBooking)
.post('/', validateBody(bookingSchema) , bookingController.postBooking)
.put('/:bookingId', validateBody(bookingSchema), bookingController.putBooking)

export { bookingRouter } ;