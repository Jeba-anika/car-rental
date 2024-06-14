import mongoose from 'mongoose'
import { TErrorMessage, TGenericErrorResponse } from '../interface/error'

const handleCastError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400
  const errorMessages: TErrorMessage[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  return {
    statusCode,
    message: 'Cast Error',
    errorMessages,
  }
}

export default handleCastError
