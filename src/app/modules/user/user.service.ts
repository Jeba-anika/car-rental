import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { TUser, TUserSignIn } from './user.interface'
import { User } from './user.model'

const createUser = async (payload: TUser) => {
  const result = await User.create(payload)
  const { password, ...userObject } = result.toObject()
  return userObject
}

const userSignIn = async (payload: TUserSignIn) => {
  const user = await User.isUserExists(payload.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!')
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user?.password,
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is not correct!')
  }

  const token = jwt.sign(
    { role: user.role, id: user._id, email: user.email },
    config.jwt_secret as string,
    { expiresIn: config.jwt_access_expires_in },
  )
  const { password, ...userData } = user.toObject()

  return { data: userData, token }
}

export const UserService = { createUser, userSignIn }
