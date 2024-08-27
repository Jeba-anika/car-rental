import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { parser } from '../../utils/fileParser'
import { CarController } from './car.controller'
import { convertAddCarReq } from './car.utils'
import { CarValidations } from './car.validation'
const router = express.Router()

router.post(
  '/',
  auth('admin'),
  parser.array('images', 10),
  convertAddCarReq,
  validateRequest(CarValidations.createCarValidation),
  CarController.createCar,
)
router.get('/:id', CarController.getSingleCar)
router.put(
  '/return',
  auth('admin'),
  validateRequest(CarValidations.returnCarValidation),
  CarController.returnCar,
)
router.put(
  '/:id',
  auth('admin'),
  validateRequest(CarValidations.updateCarValidation),
  CarController.updateCar,
)
router.delete('/:id', auth('admin'), CarController.deleteCar)

router.get('/', CarController.getAllCars)

export const CarRoutes = router
