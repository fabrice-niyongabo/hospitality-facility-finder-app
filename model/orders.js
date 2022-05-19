const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  pickupTime: { type: String },
  pickupDate: { type: String },
  ipAddress: { type: String },
  customerId: { type: String },
  status: { type: String, default: "pending" },
  totalAmount: { type: Number, required: true },
  date: { type: String, default: new Date() },
  managerId: { type: String, required: true },
});

module.exports = mongoose.model("orders", ordersSchema);
