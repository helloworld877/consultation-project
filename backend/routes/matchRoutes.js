// matchRoutes.js
const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.get("/Match", matchController.getAllMatches); // Get all matches
router.post("/Match", matchController.createMatch); // Create a new match
router.put("/Match", matchController.updateMatch); // Update a match data

module.exports = router;
