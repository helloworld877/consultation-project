// matchController.js
const Match = require("../models/match");

const getAllMatches = (req, res, next) => {
  Match.find()
    .then((matches) => {
      console.log(matches);
      res.status(200).json(matches);
    })
    .catch((err) => {
      console.log("Couldn't get matches");
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
const createMatch = (req, res, next) => {
  const homeTeam = req.body.homeTeam;
  const awayTeam = req.body.awayTeam;
  const matchVenue = req.body.matchVenue;
  const dateAndTime = req.body.dateAndTime;
  const mainReferee = req.body.mainReferee;
  const linesMen = req.body.linesMen;
  const match = new Match({
    homeTeam,
    awayTeam,
    matchVenue,
    dateAndTime,
    mainReferee,
    linesMen,
  });

  match
    .save()
    .then((result) => {
      res.status(201).json({ message: "Match added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

const updateMatch = (req, res, next) => {
  const matchId = req.body.id;
  const homeTeam = req.body.homeTeam;
  const awayTeam = req.body.awayTeam;
  const matchVenue = req.body.matchVenue;
  const dateAndTime = req.body.dateAndTime;
  const mainReferee = req.body.mainReferee;
  const linesMen = req.body.linesMen;
  Match.findOne({ id: userID }).then((match) => {
    match.id = matchId;
    match.homeTeam = homeTeam;
    match.awayTeam = awayTeam;
    match.matchVenue = matchVenue;
    match.dateAndTime = dateAndTime;
    match.mainReferee = mainReferee;
    match.linesMen = linesMen;
    return match
      .save()
      .then((result) => {
        console.log("Match Details Updated Successfully");
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => console.log(err));
  });
};

module.exports = {
  getAllMatches,
  createMatch,
  updateMatch,
};
