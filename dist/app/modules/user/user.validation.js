"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userSignupValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'User Name is required!' }),
    email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
    password: zod_1.z.string({ required_error: 'Password is required!' }),
    phone: zod_1.z.string({ required_error: 'Phone is required!' }).optional(),
    address: zod_1.z.string({ required_error: 'Address is required!' }).optional(),
    role: zod_1.z.enum(['user', 'admin']).optional(),
});
const userSignInValidation = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
    password: zod_1.z.string({ required_error: 'Password is required!' }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.UserValidation = {
    userSignupValidation,
    userSignInValidation,
    refreshTokenValidationSchema,
};
