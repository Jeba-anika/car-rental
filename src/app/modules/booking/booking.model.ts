import { Schema, model } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>(
  {
    date: { type: Date, required: true },
    car: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export const Booking = model<TBooking>('Booking', bookingSchema)
