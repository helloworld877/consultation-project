const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const matchSchema = new Schema({
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  matchVenue: {
    type: String,
    required: true,
  },
  dateAndTime: {
    type: String,
    required: true,
  },
  mainReferee: {
    type: String,
    required: true,
  },
  linesMen: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Match", userSchema);
