/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { TUser, TUserSignIn } from './user.interface'
import { User } from './user.model'
import { verifyToken } from './user.utils'

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
  const jwtPayload = { role: user.role, id: user._id, email: user.email }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  })
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  )
  const { password, ...userData } = user.toObject()

  return { data: userData, accessToken, refreshToken }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { id, iat, email } = decoded

  // checking if the user is exist
  const user = await User.isUserExists(email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!')
  }

  // if (
  //   user.passwordChangedAt &&
  //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  // ) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  // }

  const jwtPayload = { role: user.role, id: user._id, email: user.email }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  })

  return {
    accessToken,
  }
}

const updateProfile = async (payload: Partial<TUser>, userInfo: any) => {
  const user = await User.isUserExists(userInfo.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!')
  }

  const result = await User.findByIdAndUpdate(user._id, payload, { new: true })
  return result
}
const getProfile = async (userInfo: any) => {
  const user = await User.isUserExists(userInfo.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!')
  }

  return user
}
const getUsers = async () => {
  const users = await User.find({})

  return users
}

const changeStatus = async (user: TUser) => {
  let status = {}
  if (user.status === 'active') {
    status = { status: 'blocked' }
  } else if (user.status === 'blocked') {
    status = { status: 'blocked' }
  }
  const result = await User.findByIdAndUpdate(user._id, status, { new: true })
  return result
}

export const UserService = {
  createUser,
  userSignIn,
  refreshToken,
  updateProfile,
  getProfile,
  getUsers,
}
