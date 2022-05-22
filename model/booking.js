const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  managerId: { type: String, required: true },
  customerId: { type: String, required: true },
  checkinDate: { type: String, required: true },
  checkoutDate: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  totalDays: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" },
  transactionId: { type: Number },
  transactionDate: { type: Date, default: new Date() },
});

module.exports = mongoose.model("booking", bookingSchema);
