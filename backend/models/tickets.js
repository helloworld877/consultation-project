const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ticketsSchema = new Schema({
  ticketId: {
    type: String,
    unique: true,
    required: true,
  },
  ticketHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketsSchema, "tickets");
