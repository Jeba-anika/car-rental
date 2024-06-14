import { z } from 'zod'

const createCarValidation = z.object({
  name: z.string({ required_error: 'User Name is required!' }),
  description: z.string({ required_error: 'Description is required!' }),
  color: z.string({ required_error: 'Color is required!' }),
  isElectric: z.boolean({ required_error: 'isElectric required!' }),
  features: z.array(z.string(), { required_error: 'Features is required' }),
  pricePerHour: z.number(),
})
const updateCarValidation = z.object({
  name: z.string({ required_error: 'User Name is required!' }).optional(),
  description: z
    .string({ required_error: 'Description is required!' })
    .optional(),
  color: z.string({ required_error: 'Color is required!' }).optional(),
  isElectric: z.boolean({ required_error: 'isElectric required!' }).optional(),
  features: z
    .array(z.string(), { required_error: 'Features is required' })
    .optional(),
  pricePerHour: z.number().optional(),
})

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
const returnCarValidation = z.object({
  bookingId: z.string({ required_error: 'Booking id is required!' }),
  endTime: z.string().refine((time) => timeRegex.test(time), {
    message: 'Invalid time format. Expected HH:mm.',
  }),
})

export const CarValidations = {
  createCarValidation,
  updateCarValidation,
  returnCarValidation,
}
