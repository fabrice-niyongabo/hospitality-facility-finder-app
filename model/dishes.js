const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("dishes", dishesSchema);
