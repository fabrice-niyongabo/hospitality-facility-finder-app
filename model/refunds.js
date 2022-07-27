const mongoose = require("mongoose");

const refundsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderId: { type: String, required: true },
  orderType: { type: String, required: true }, //"room" : "menu",
  description: { type: String, required: true },
  date: { type: String, default: new Date() },
  accepted: { type: Boolean, default: false },
});
module.exports = mongoose.model("refunds", refundsSchema);
