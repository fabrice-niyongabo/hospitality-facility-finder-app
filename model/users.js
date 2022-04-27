const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  role: { type: String, default: "user", required: true },
  token: { type: String },
  createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("users", userSchema);
