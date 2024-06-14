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

export const CarService = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
}
