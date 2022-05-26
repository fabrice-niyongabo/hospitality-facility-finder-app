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
  transactionId: { type: String, required: true, default: "-" },
  totalAmount: { type: Number, required: true, default: 0 },
  transactionDate: { type: Date, default: new Date() },
  transfered: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("booking", bookingSchema);
