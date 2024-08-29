/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { Booking } from '../booking/booking.model'
import { TCar, TReturnCar } from './car.interface'
import { Car } from './car.model'
import { calcTotalDuration } from './car.utils'

const createCar = async (payload: TCar) => {
  const result = await Car.create(payload)
  return result
}

const getAllCars = async () => {
  const result = await Car.find({})
  return result
}

const getSingleCar = async (carId: string) => {
  const result = await Car.findById(carId)
  return result
}
const getRandomCars = async () => {
  const result = await Car.aggregate([
    { $match: { status: 'available' } },
    { $sample: { size: 6 } },
  ])
  return result
}

const updateCar = async (carId: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(carId, payload, { new: true })
  return result
}
const deleteCar = async (carId: string) => {
  const result = await Car.findByIdAndUpdate(
    carId,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const returnCar = async (payload: TReturnCar) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const booking = await Booking.findById(payload.bookingId)
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking does not exist!')
    }

    const updatedCar = await Car.findByIdAndUpdate(
      booking.car,
      {
        status: 'available',
      },
      { new: true },
    )

    const time = calcTotalDuration(booking.startTime, payload.endTime)
    const price = time * (updatedCar?.pricePerHour as number)
    const updatedBookingData = {
      endTime: payload.endTime,
      totalCost: price,
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      payload.bookingId,
      updatedBookingData,
      { new: true },
    )
      .populate('car')
      .populate('user')

    await session.commitTransaction()
    await session.endSession()

    return updatedBooking
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err.message)
  }
}

export const CarService = {
  createCar,
  getAllCars,
  getSingleCar,
  getRandomCars,
  updateCar,
  deleteCar,
  returnCar,
}
