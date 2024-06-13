import { TCar } from './car.interface'
import { Car } from './car.model'

const createCar = async (payload: TCar) => {
  const result = await Car.create(payload)
  return result
}

export const CarService = { createCar }
