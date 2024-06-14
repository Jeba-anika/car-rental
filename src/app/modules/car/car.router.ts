import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { CarController } from './car.controller'
import { CarValidations } from './car.validation'
const router = express.Router()

router.post(
  '/',
  auth('admin'),
  validateRequest(CarValidations.createCarValidation),
  CarController.createCar,
)
router.get('/:id', CarController.getSingleCar)
router.put(
  '/:id',
  auth('admin'),
  validateRequest(CarValidations.updateCarValidation),
  CarController.updateCar,
)
router.delete('/:id', auth('admin'), CarController.deleteCar)
router.put('/return', validateRequest(CarValidations.returnCarValidation))
router.get('/', CarController.getAllCars)

export const CarRoutes = router
