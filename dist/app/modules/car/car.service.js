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
exports.CarService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_model_1 = require("../booking/booking.model");
const car_model_1 = require("./car.model");
const car_utils_1 = require("./car.utils");
const createCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const getAllCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.find({});
    return result;
});
const getSingleCar = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findById(carId);
    return result;
});
const getRandomCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.aggregate([
        { $match: { status: 'available' } },
        { $sample: { size: 6 } },
    ]);
    return result;
});
const updateCar = (carId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(carId, payload, { new: true });
    return result;
});
const deleteCar = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(carId, { isDeleted: true }, { new: true });
    return result;
});
const returnCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const booking = yield booking_model_1.Booking.findById(payload.bookingId);
        if (!booking) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking does not exist!');
        }
        const updatedCar = yield car_model_1.Car.findByIdAndUpdate(booking.car, {
            status: 'available',
        }, { new: true });
        const time = (0, car_utils_1.calcTotalDuration)(booking.startTime, payload.endTime);
        const price = time * (updatedCar === null || updatedCar === void 0 ? void 0 : updatedCar.pricePerHour);
        const updatedBookingData = {
            endTime: payload.endTime,
            totalCost: price,
        };
        const updatedBooking = yield booking_model_1.Booking.findByIdAndUpdate(payload.bookingId, updatedBookingData, { new: true })
            .populate('car')
            .populate('user');
        yield session.commitTransaction();
        yield session.endSession();
        return updatedBooking;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err.message);
    }
});
exports.CarService = {
    createCar,
    getAllCars,
    getSingleCar,
    getRandomCars,
    updateCar,
    deleteCar,
    returnCar,
};
