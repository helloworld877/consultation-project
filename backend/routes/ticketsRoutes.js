// matchRoutes.js
const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketsController");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
// Create a new Ticket
router.post(
  "/createTicket",
  bodyParser.json(),
  userController.authenticateToken,
  ticketController.createTicket
);

module.exports = router;
