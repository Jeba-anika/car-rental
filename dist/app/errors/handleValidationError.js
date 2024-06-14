"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const keys = Object.keys(err.errors);
    const errorMessages = keys.map((key) => {
        return {
            path: err.errors[key].path,
            message: err.errors[key].message,
        };
    });
    return {
        errorMessages,
        statusCode: 400,
        message: 'Validation Error',
    };
};
exports.default = handleValidationError;
