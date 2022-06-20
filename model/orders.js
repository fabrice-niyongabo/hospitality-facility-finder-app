const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  pickupTime: { type: String },
  pickupDate: { type: String },
  customerId: { type: String },
  status: { type: String, default: "pending" },
  transactionId: { type: String, default: "-", required: true },
  totalAmount: { type: Number, required: true },
  date: { type: String, default: new Date() },
  managerId: { type: String, required: true },
  transfered: { type: String, required: true, default: "No" },
  transferId: { type: String, required: true, default: "-" },
});

module.exports = mongoose.model("orders", ordersSchema);
