const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  sector: { type: String, required: true },
  cell: { type: String, required: true },
  ratings: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("restaurants", restaurantsSchema);
