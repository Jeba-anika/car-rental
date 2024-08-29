import { Types } from 'mongoose'

export type TBooking = {
  date: Date
  user: Types.ObjectId | string
  car: Types.ObjectId | string
  startTime: string
  endTime?: string | null
  totalCost?: number
  status: 'pending' | 'confirmed' | 'cancelled'
}

export type TCreateBooking = {
  carId: Types.ObjectId
  date: Date
  startTime: string
}
