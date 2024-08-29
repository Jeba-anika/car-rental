"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const carImgSchema = new mongoose_1.Schema({
    altText: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});
const carSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    },
    carType: {
        type: String,
        required: true,
    },
    numberOfSeats: {
        type: Number,
        required: true,
    },
    mileage: {
        type: Number,
        required: true,
    },
    vin: {
        type: Number,
        required: true,
        unique: true,
    },
    images: {
        type: [carImgSchema],
        required: true,
    },
    insuranceInfo: {
        provider: {
            type: String,
            required: true,
        },
        policyNumber: {
            type: String,
            required: true,
        },
        coverageDetails: {
            type: String,
            required: true,
        },
    },
    features: { type: [String], required: true },
    isElectric: { type: Boolean, required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.Car = (0, mongoose_1.model)('Car', carSchema);
