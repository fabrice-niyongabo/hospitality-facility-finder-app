const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  lat: { type: String },
  long: { type: String },
  stars: { type: String },
  averagePrice: { type: String, default: "50000" },
  image: { type: String },
  managerId: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("facilities", facilitySchema);
