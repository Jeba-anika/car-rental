"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const createBookingValidation = zod_1.z.object({
    carId: zod_1.z.string({ required_error: 'Car id is required' }),
    date: zod_1.z.string({ required_error: 'Booking date is required' }).date(),
    startTime: zod_1.z.string().refine((time) => timeRegex.test(time), {
        message: 'Invalid time format. Expected HH:mm.',
    }),
});
exports.BookingValidation = { createBookingValidation };
