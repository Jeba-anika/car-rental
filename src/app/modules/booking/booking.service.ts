import { TBooking, TCreateBooking } from './booking.interface'
import { Booking } from './booking.model'

const createBooking = async (payload: TCreateBooking, userId: string) => {
  const data: Partial<TBooking> = {
    user: userId,
    car: payload.carId,
    date: payload.date,
    startTime: payload.startTime,
  }
  const result = (await (await Booking.create(data)).populate('user')).populate(
    'car',
  )
  return result
}

const getAllBookingsOfUser = async (userId: string) => {
  const result = await Booking.find({ user: userId })
    .populate('user')
    .populate('car')
  return result
}
export const BookingService = {
  createBooking,
  getAllBookingsOfUser,
}
