import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CarService } from './car.service'

const createCar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarService.createCar(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car created successfully',
    data: result,
  })
})

export const CarController = {
  createCar,
}
