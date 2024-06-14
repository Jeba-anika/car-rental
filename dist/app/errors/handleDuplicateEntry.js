"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateEntry = (err) => {
    //const message = err.message
    const statusCode = 400;
    const errorMessages = [
        {
            path: Object.keys(err.keyPattern)[0],
            message: err.message,
        },
    ];
    return {
        errorMessages,
        message: 'Duplicate Entry',
        statusCode,
    };
};
exports.default = handleDuplicateEntry;
