"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_router_1 = require("../modules/booking/booking.router");
const car_router_1 = require("../modules/car/car.router");
const user_router_1 = require("../modules/user/user.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_router_1.UserRouter,
    },
    {
        path: "/cars",
        route: car_router_1.CarRoutes,
    },
    {
        path: "/bookings",
        route: booking_router_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
