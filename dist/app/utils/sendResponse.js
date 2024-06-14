"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    var _a, _b;
    let response = {};
    if (data.token) {
        response = {
            success: data.success,
            statusCode: data.statusCode,
            message: data.message,
            data: data.data,
            token: data.token,
        };
    }
    else {
        response = {
            success: data.success,
            statusCode: Array.isArray(data === null || data === void 0 ? void 0 : data.data)
                ? ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.length) > 0
                    ? data.statusCode
                    : 404
                : data.statusCode,
            message: Array.isArray(data === null || data === void 0 ? void 0 : data.data)
                ? ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.length) > 0
                    ? data.message
                    : 'No Data Found'
                : data.message,
            data: data.data,
        };
    }
    res.status(data.statusCode).json(response);
};
exports.default = sendResponse;
