const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  km: { type: Number, required: true },
  departureTime: { type: String, required: true },
  departureDate: { type: String, required: true },
  transactionId: { type: String, required: true, default: "-" },
  driverLanguage: { type: String, required: true },
  paymentId: { type: Number, required: true },
  amountToBePaid: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  deliveryStatus: { type: String, required: true, default: "pending" },
  parentTransactionId: { type: String, required: true },
  managerId: { type: String, required: true },
  customerId: { type: String, required: true },
  driverId: { type: String, required: true, default: "-" },
  date: { type: String, default: new Date() },
});

module.exports = mongoose.model("transportation", transportSchema);
