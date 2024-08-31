import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserService } from './user.service'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  })
})
const userSignIn = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.userSignIn(req.body)
  const { refreshToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result.data,
    accessToken: result.accessToken,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await UserService.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  })
})
const getProfile = catchAsync(async (req, res) => {
  const result = await UserService.getProfile(req.user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched Successfully!',
    data: result,
  })
})
const updateProfile = catchAsync(async (req, res) => {
  const result = await UserService.updateProfile(req.body, req.user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Updated Successfully!',
    data: result,
  })
})

const getUsers = catchAsync(async (req, res) => {
  const result = await UserService.getUsers()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched Successfully!',
    data: result,
  })
})
const changeStatus = catchAsync(async (req, res) => {
  const result = await UserService.changeStatus(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users status updated Successfully!',
    data: result,
  })
})

export const UserController = {
  createUser,
  userSignIn,
  refreshToken,
  updateProfile,
  getProfile,
  getUsers,
  changeStatus,
}
