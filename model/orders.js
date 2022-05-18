const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  pickupTime: { type: String, required: true },
  pickupDate: { type: String, required: true },
  ipAddress: { type: String },
  customerId: { type: String },
  status: { type: String, default: "pending" },
  quantity: { type: String },
  date: { type: String, default: new Date() },
  managerId: { type: String, required: true },
});

module.exports = mongoose.model("orders", ordersSchema);
