import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { TUserRole } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'
import catchAsync from '../utils/catchAsync'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload
    const { role, id, email } = decoded

    const user = await User.isUserExists(email)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'The user does not exist!')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
