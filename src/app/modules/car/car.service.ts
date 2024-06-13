import { TCar } from './car.interface'
import { Car } from './car.model'

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

export const CarService = { createCar, getAllCars, getSingleCar }
