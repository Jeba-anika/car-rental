import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarController } from './car.controller'
import { CarValidations } from './car.validation'
const router = express.Router()

router.post(
  '/',
  validateRequest(CarValidations.createCarValidation),
  CarController.createCar,
)
router.get('/:id')
router.put('/:id')
router.delete('/:id')
router.put('/return')
router.get('/')

export const CarRoutes = router
