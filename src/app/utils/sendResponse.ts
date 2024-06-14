import { Response } from 'express'

type TResponseData<T> = {
  success: boolean
  statusCode: number
  message: string
  data: T
  token?: string
}

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  let response = {}
  if (data.token) {
    response = {
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      data: data.data,
      token: data.token,
    }
  } else {
    response = {
      success: data.success,
      statusCode: data?.data?.length > 0 ? data.statusCode : 404,
      message: data?.data?.length > 0 ? data.message : 'No Data Found',
      data: data.data,
    }
  }
  res.status(data.statusCode).json(response)
}

export default sendResponse
