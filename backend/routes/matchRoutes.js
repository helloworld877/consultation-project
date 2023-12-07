// matchRoutes.js
const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");
const bodyParser = require("body-parser");

router.get("/getAllMatches", bodyParser.json(), matchController.getAllMatches); // Get all matches
router.post("/createMatch", bodyParser.json(), matchController.createMatch); // Create a new match
router.put("/updateMatch", bodyParser.json(), matchController.updateMatch); // Update a match data

module.exports = router;
