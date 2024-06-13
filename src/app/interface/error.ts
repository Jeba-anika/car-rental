export type TErrorMessage = {
  path: string
  message: string
}
export type TGenericErrorResponse = {
  message: string
  errorMessages: TErrorMessage[]
  statusCode: number
}
