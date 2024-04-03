import { notFoundError } from "@/errors"
import { bookingRepository } from "@/repositories"


async function getBooking(userId: number){
    const booking = bookingRepository.findUserId(userId)
    if(!booking) throw notFoundError()

    return booking
}


export const bookingService = {
    getBooking
}