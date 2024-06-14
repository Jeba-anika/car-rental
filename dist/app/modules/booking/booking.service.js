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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = require("../car/car.model");
const booking_model_1 = require("./booking.model");
const createBooking = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const isCarExists = yield car_model_1.Car.findById(payload.carId);
        if (!isCarExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The car does not exist!');
        }
        if (isCarExists.status === 'unavailable') {
            throw new AppError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'The car is not currently available for booking!');
        }
        if (isCarExists.isDeleted === true) {
            throw new AppError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'The car does not exist!');
        }
        yield car_model_1.Car.findByIdAndUpdate(payload.carId, { status: 'unavailable' }, { new: true });
        const data = {
            user: userId,
            car: payload.carId,
            date: payload.date,
            startTime: payload.startTime,
        };
        const result = (yield (yield booking_model_1.Booking.create(data)).populate('user')).populate('car');
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err.message);
    }
});
const getAllBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.Booking.find().populate('user').populate('car'), query);
    const result = yield bookingQuery.modelQuery;
    return result;
});
const getAllBookingsOfUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: userId })
        .populate('user')
        .populate('car');
    return result;
});
exports.BookingService = {
    createBooking,
    getAllBookingsOfUser,
    getAllBookings,
};
