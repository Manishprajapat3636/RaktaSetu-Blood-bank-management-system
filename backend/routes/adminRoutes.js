// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Donor = require("../models/Donor");
const BloodBank = require("../models/BloodBank");
const Feedback = require("../models/Feedback");
const User = require("../models/User");

// Simple admin stats
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const [userCount, donorCount, bankCount, feedbackCount] = await Promise.all([
      User.countDocuments(),
      Donor.countDocuments(),
      BloodBank.countDocuments(),
      Feedback.countDocuments()
    ]);
    res.json({ userCount, donorCount, bankCount, feedbackCount });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
