const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const Booking = require("../models/Booking");


router.post("/", createBooking);

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("resourceId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;