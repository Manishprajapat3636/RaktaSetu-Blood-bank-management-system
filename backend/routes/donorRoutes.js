// backend/routes/donorRoutes.js
const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const { protect } = require("../middleware/authMiddleware");

// Register as donor
router.post("/", protect, async (req, res) => {
  try {
    const { name, bloodGroup, phone, city, state, lastDonationDate } = req.body;
    const donor = await Donor.create({
      user: req.user._id,
      name,
      bloodGroup,
      phone,
      city,
      state,
      lastDonationDate
    });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Find blood by location + blood group
router.get("/search", async (req, res) => {
  try {
    const { city, state, bloodGroup } = req.query;
    const query = {};
    if (city) query.city = new RegExp(city, "i");
    if (state) query.state = new RegExp(state, "i");
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const donors = await Donor.find(query).sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
