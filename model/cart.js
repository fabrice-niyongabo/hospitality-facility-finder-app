const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  menuId: { type: String, required: true },
  menuName: { type: String, required: true },
  menuDescription: { type: String, required: true },
  menuImage: { type: String },
  ipAddress: { type: String },
  customerId: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  managerId: { type: String, required: true },
  facilityName: { type: String, required: true },
  paymentInitialised: { type: Boolean, default: false, required: true },
  orderId: { type: String, default: " ", required: true },
});

module.exports = mongoose.model("cart", cartSchema);
