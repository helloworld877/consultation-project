// matchRoutes.js
const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.get("/getAllMatches", matchController.getAllMatches); // Get all matches
router.post("/createMatch", matchController.createMatch); // Create a new match
router.put("/updateMatch", matchController.updateMatch); // Update a match data

module.exports = router;
