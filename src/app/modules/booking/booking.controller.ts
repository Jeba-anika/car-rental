import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingService } from './booking.service'

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body, req.user.id)
  sendResponse(res, {
    data: result,
    message: 'Car booked successfully',
    statusCode: httpStatus.OK,
    success: true,
  })
})

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings(req.query)
  sendResponse(res, {
    data: result,
    message: 'Bookings retrieved successfully',
    statusCode: httpStatus.OK,
    success: true,
  })
})
const getAllBookingsOfUser = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingsOfUser(req.user.id)
  sendResponse(res, {
    data: result,
    message: 'My Bookings retrieved successfully',
    statusCode: httpStatus.OK,
    success: true,
  })
})

export const BookingController = {
  createBooking,
  getAllBookingsOfUser,
  getAllBookings,
}
