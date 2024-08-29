import { z } from 'zod'

const userSignupValidation = z.object({
  name: z.string({ required_error: 'User Name is required!' }),
  email: z.string({ required_error: 'Email is required!' }).email(),
  password: z.string({ required_error: 'Password is required!' }),
  phone: z.string({ required_error: 'Phone is required!' }).optional(),
  address: z.string({ required_error: 'Address is required!' }).optional(),
  role: z.enum(['user', 'admin']).optional(),
})
const userSignInValidation = z.object({
  email: z.string({ required_error: 'Email is required!' }).email(),
  password: z.string({ required_error: 'Password is required!' }),
})
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})
const updateProfileValidation = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export const UserValidation = {
  userSignupValidation,
  userSignInValidation,
  refreshTokenValidationSchema,
  updateProfileValidation,
}
