const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  // facilityId: { type: String, required: true },
  managerId: { type: String, required: true },
  description: { type: String, required: true },
  checkIn: { type: Boolean, default: false, required: true },
  checkOut: { type: Boolean, default: false, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, default: "available" },
});

module.exports = mongoose.model("rooms", roomsSchema);
