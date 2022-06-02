const mongoose = require("mongoose");

const driversSchema = new mongoose.Schema({
  name: { type: String, required: true },
  driverId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, required: true },
  managerId: { type: String, required: true },
});

module.exports = mongoose.model("drivers", driversSchema);
