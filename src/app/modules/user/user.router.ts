import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.userSignupValidation),
  UserController.createUser,
)
router.post(
  '/signin',
  validateRequest(UserValidation.userSignInValidation),
  UserController.userSignIn,
)

export const UserRouter = router
