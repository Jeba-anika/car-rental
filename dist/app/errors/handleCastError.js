"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const errorMessages = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages,
    };
};
exports.default = handleCastError;
