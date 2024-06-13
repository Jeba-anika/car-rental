import express from "express";
const router = express.Router();

router.post("/");
router.get("/my-bookings");
router.get("/");

export const BookingRoutes = router;
