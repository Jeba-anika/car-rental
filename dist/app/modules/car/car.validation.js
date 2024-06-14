"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidations = void 0;
const zod_1 = require("zod");
const createCarValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'User Name is required!' }),
    description: zod_1.z.string({ required_error: 'Description is required!' }),
    color: zod_1.z.string({ required_error: 'Color is required!' }),
    isElectric: zod_1.z.boolean({ required_error: 'isElectric required!' }),
    features: zod_1.z.array(zod_1.z.string(), { required_error: 'Features is required' }),
    pricePerHour: zod_1.z.number(),
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
