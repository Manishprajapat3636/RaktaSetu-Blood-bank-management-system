// backend/routes/bloodBankRoutes.js
const express = require("express");
const router = express.Router();
const BloodBank = require("../models/BloodBank");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin: add blood bank
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const bloodBank = await BloodBank.create(req.body);
    res.json(bloodBank);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Search blood banks
router.get("/", async (req, res) => {
  try {
    const { q, city } = req.query;
    const filter = {};
    if (city) filter.city = new RegExp(city, "i");
    if (q) filter.name = new RegExp(q, "i");

    const bloodBanks = await BloodBank.find(filter).sort({ createdAt: -1 });
    res.json(bloodBanks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
