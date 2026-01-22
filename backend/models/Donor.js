// backend/models/Donor.js
const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    lastDonationDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);
