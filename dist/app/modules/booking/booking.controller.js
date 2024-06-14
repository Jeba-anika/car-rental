"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.createBooking(req.body, req.user.id);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Car booked successfully',
        statusCode: http_status_1.default.OK,
        success: true,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getAllBookings(req.query);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Bookings retrieved successfully',
        statusCode: http_status_1.default.OK,
        success: true,
    });
}));
const getAllBookingsOfUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getAllBookingsOfUser(req.user.id);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'My Bookings retrieved successfully',
        statusCode: http_status_1.default.OK,
        success: true,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBookingsOfUser,
    getAllBookings,
};
