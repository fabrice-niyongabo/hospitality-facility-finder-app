const mongoose = require("mongoose");

const restaurantsMenusSchema = new mongoose.Schema({
  managerId: { type: String, required: true },
  menuName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("restaurantsMenus", restaurantsMenusSchema);
