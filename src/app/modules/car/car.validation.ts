import { z } from 'zod'
const carImgSchema = z.object({
  altText: z.string({ required_error: 'Alt text is required' }),
  url: z.string(),
})
const insuranceInfoSchema = z.object({
  provider: z.string().nonempty('Provider is required'),
  policyNumber: z.string().nonempty('Policy number is required'),
  coverageDetails: z.string().nonempty('Coverage details are required'),
})
const createCarValidation = z.object({
  name: z.string({ required_error: 'User Name is required!' }),
  description: z.string({ required_error: 'Description is required!' }),
  color: z.string({ required_error: 'Color is required!' }),
  carType: z.string({ required_error: 'Car type is required' }),
  isElectric: z.boolean({ required_error: 'isElectric required!' }),
  features: z.array(z.string(), { required_error: 'Features is required' }),
  pricePerHour: z.number(),
  numberOfSeats: z
    .number()
    .int()
    .positive('Number of seats must be a positive integer'),
  mileage: z.number().nonnegative('Mileage must be non-negative'),
  vin: z.number().int().positive('VIN must be a positive integer'),
  images: z.array(carImgSchema).nonempty('Images array cannot be empty'),
  insuranceInfo: insuranceInfoSchema,
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
