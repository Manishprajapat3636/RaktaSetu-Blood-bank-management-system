// backend/models/BloodBank.js
const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodBank", bloodBankSchema);
