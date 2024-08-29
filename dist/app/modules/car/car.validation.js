"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidations = void 0;
const zod_1 = require("zod");
const carImgSchema = zod_1.z.object({
    altText: zod_1.z.string({ required_error: 'Alt text is required' }),
    url: zod_1.z.string(),
});
const insuranceInfoSchema = zod_1.z.object({
    provider: zod_1.z.string().nonempty('Provider is required'),
    policyNumber: zod_1.z.string().nonempty('Policy number is required'),
    coverageDetails: zod_1.z.string().nonempty('Coverage details are required'),
});
const createCarValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'User Name is required!' }),
    description: zod_1.z.string({ required_error: 'Description is required!' }),
    color: zod_1.z.string({ required_error: 'Color is required!' }),
    carType: zod_1.z.string({ required_error: 'Car type is required' }),
    isElectric: zod_1.z.boolean({ required_error: 'isElectric required!' }),
    features: zod_1.z.array(zod_1.z.string(), { required_error: 'Features is required' }),
    pricePerHour: zod_1.z.number(),
    numberOfSeats: zod_1.z
        .number()
        .int()
        .positive('Number of seats must be a positive integer'),
    mileage: zod_1.z.number().nonnegative('Mileage must be non-negative'),
    vin: zod_1.z.number().int().positive('VIN must be a positive integer'),
    images: zod_1.z.array(carImgSchema).nonempty('Images array cannot be empty'),
    insuranceInfo: insuranceInfoSchema,
});
const updateCarValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'User Name is required!' }).optional(),
    description: zod_1.z
        .string({ required_error: 'Description is required!' })
        .optional(),
    color: zod_1.z.string({ required_error: 'Color is required!' }).optional(),
    isElectric: zod_1.z.boolean({ required_error: 'isElectric required!' }).optional(),
    features: zod_1.z
        .array(zod_1.z.string(), { required_error: 'Features is required' })
        .optional(),
    pricePerHour: zod_1.z.number().optional(),
});
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const returnCarValidation = zod_1.z.object({
    bookingId: zod_1.z.string({ required_error: 'Booking id is required!' }),
    endTime: zod_1.z.string().refine((time) => timeRegex.test(time), {
        message: 'Invalid time format. Expected HH:mm.',
    }),
});
exports.CarValidations = {
    createCarValidation,
    updateCarValidation,
    returnCarValidation,
};
