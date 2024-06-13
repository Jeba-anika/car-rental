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
const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result = await CarService.getAllCars()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully',
    data: result,
  })
})
const getSingleCar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarService.getSingleCar(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully',
    data: result,
  })
})

export const CarController = {
  createCar,
  getAllCars,
  getSingleCar,
}
