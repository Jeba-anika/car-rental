import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "not available"],
    default: "available",
  },
  features: { type: [String], required: true },
  isElectric: { type: Boolean, required: true },
  pricePerHour: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Car = model<TCar>("Car", carSchema);
