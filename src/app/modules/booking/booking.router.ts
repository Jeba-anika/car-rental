import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { BookingController } from './booking.controller'
import { BookingValidation } from './booking.validation'
const router = express.Router()

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidation.createBookingValidation),
  BookingController.createBooking,
)
router.get('/my-bookings', auth('user'), BookingController.getAllBookingsOfUser)
router.get('/', auth('admin'), BookingController.getAllBookings)

export const BookingRoutes = router
