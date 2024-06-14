import { ZodError, ZodIssue } from 'zod'
import { TErrorMessage, TGenericErrorResponse } from '../interface/error'

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessages: TErrorMessage[] = err?.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1] as string,
      message: issue.message,
    }
  })
  return {
    errorMessages,
    message: 'Validation Error',
    statusCode: 400,
  }
}

export default handleZodError
