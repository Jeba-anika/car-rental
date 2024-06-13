import { TErrorMessage, TGenericErrorResponse } from '../interface/error'

const handleDuplicateEntry = (err: any): TGenericErrorResponse => {
  const message = err.message
  const statusCode = 400
  const errorMessages: TErrorMessage[] = [
    {
      path: Object.keys(err.keyPattern)[0],
      message: err.message,
    },
  ]
  return {
    errorMessages,
    message,
    statusCode,
  }
}

export default handleDuplicateEntry
