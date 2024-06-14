import mongoose from 'mongoose'
import { TGenericErrorResponse } from '../interface/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const keys = Object.keys(err.errors)
  const errorMessages = keys.map((key) => {
    return {
      path: err.errors[key].path,
      message: err.errors[key].message,
    }
  })
  return {
    errorMessages,
    statusCode: 400,
    message: 'Validation Error',
  }
}

export default handleValidationError
