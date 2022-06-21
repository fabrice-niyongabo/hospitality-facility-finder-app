const mongoose = require("mongoose");
const analyticsSchema = new mongoose.Schema({
  managerId: { type: String, required: true },
  itemId: { type: String, required: true },
  itemType: { type: String, required: true },
  day: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("analytics", analyticsSchema);
