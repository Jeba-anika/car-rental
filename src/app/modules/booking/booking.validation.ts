import { z } from 'zod'

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
const createBookingValidation = z.object({
  carId: z.string({ required_error: 'Car id is required' }),
  date: z.string({ required_error: 'Booking date is required' }).date(),
  startTime: z.string().refine((time) => timeRegex.test(time), {
    message: 'Invalid time format. Expected HH:mm.',
  }),
})
export const BookingValidation = { createBookingValidation }
