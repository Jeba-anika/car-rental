import express from 'express'
import auth from '../../middlewares/auth'
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
router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserController.refreshToken,
)

router.put(
  '/update-profile',
  auth('user', 'admin'),
  UserController.updateProfile,
)
router.get('/profile', auth('user', 'admin'), UserController.getProfile)
router.get('/users', auth('admin'), UserController.getUsers)
router.get('/user-status-update', auth('admin'), UserController.changeStatus)

export const UserRouter = router
