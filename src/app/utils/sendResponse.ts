import { Response } from 'express'

type TResponseData<T> = {
  success: boolean
  statusCode: number
  message: string
  data: T
  accessToken?: string
}

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  let response = {}
  if (data.accessToken) {
    response = {
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      data: data.data,
      accessToken: data.accessToken,
    }
  } else {
    response = {
      success: data.success,
      statusCode: Array.isArray(data?.data)
        ? data?.data?.length > 0
          ? data.statusCode
          : 404
        : data.statusCode,
      message: Array.isArray(data?.data)
        ? data?.data?.length > 0
          ? data.message
          : 'No Data Found'
        : data.message,
      data: data.data,
    }
  }
  res.status(data.statusCode).json(response)
}

export default sendResponse
