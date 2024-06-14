"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userSignupValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'User Name is required!' }),
    email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
    password: zod_1.z.string({ required_error: 'Password is required!' }),
    phone: zod_1.z.string({ required_error: 'Phone is required!' }),
    address: zod_1.z.string({ required_error: 'Address is required!' }),
    role: zod_1.z.enum(['user', 'admin']),
});
const userSignInValidation = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
    password: zod_1.z.string({ required_error: 'Password is required!' }),
});
exports.UserValidation = { userSignupValidation, userSignInValidation };
