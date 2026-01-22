// backend/routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Add feedback
router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const fb = await Feedback.create({ name, message, rating });
    res.json(fb);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get feedback (latest first)
router.get("/", async (req, res) => {
  try {
    const fb = await Feedback.find().sort({ createdAt: -1 }).limit(30);
    res.json(fb);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
