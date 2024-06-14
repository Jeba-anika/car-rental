import { z } from 'zod'

const userSignupValidation = z.object({
  name: z.string({ required_error: 'User Name is required!' }),
  email: z.string({ required_error: 'Email is required!' }).email(),
  password: z.string({ required_error: 'Password is required!' }),
  phone: z.string({ required_error: 'Phone is required!' }),
  address: z.string({ required_error: 'Address is required!' }),
  role: z.enum(['user', 'admin']),
})
const userSignInValidation = z.object({
  email: z.string({ required_error: 'Email is required!' }).email(),
  password: z.string({ required_error: 'Password is required!' }),
})

export const UserValidation = { userSignupValidation, userSignInValidation }
