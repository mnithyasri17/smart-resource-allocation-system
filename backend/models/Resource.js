const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: String,
  type: String, // room, lab, bed
  status: { type: String, default: "available" },
  currentBooking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" }
});

module.exports = mongoose.model("Resource", resourceSchema);