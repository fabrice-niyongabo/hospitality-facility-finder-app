const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  km: { type: Number, required: true },
  departureTime: { type: String, required: true },
  departureTime: { type: String, required: true },
  transactionId: { type: String, required: true, default: "-" },
  status: { type: String, required: true, default: "pending" },
  parentTransactionId: { type: String, required: true },
  managerId: { type: String, required: true },
  date: { type: String, default: new Date() },
});

module.exports = mongoose.model("transportation", transportSchema);
