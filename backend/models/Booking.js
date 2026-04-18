const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userName: String,
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
  priority: Number, // 1 (low) to 4 (high)
  timeSlot: String,
  status: { type: String, default: "active" } // active / waitlisted
});

module.exports = mongoose.model("Booking", bookingSchema);