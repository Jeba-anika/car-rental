"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    car: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Car' },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
