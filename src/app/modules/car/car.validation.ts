import { z } from "zod";

const createCarValidation = z.object({
  name: z.string({ required_error: "User Name is required!" }),
  description: z.string({ required_error: "Description is required!" }),
  color: z.string({ required_error: "Color is required!" }),
  isElectric: z.boolean({ required_error: "isElectric required!" }),
  features: z.array(z.string(), { required_error: "Features is required" }),
  pricePerHour: z.number(),
});

export const CarValidations = {
  createCarValidation,
};
