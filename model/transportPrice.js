const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  price: { required: true, type: Number },
  date: { type: String, default: new Date() },
});

module.exports = mongoose.model("transportPrice", transportSchema);
