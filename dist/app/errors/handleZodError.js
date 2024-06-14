"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorMessages = err === null || err === void 0 ? void 0 : err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        errorMessages,
        message: 'Validation Error',
        statusCode: 400,
    };
};
exports.default = handleZodError;
