// matchController.js
const Match = require("../models/match");
const Stadium = require("../models/stadium");

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
//gets a match based on ID
const getMatch = (req, res, next) => {
  id = req.body.id;
  Match.findOne({ _id: id })
    .then((match) => {
      console.log(match);
      Stadium.findOne({ name: match.matchVenue }).then((stadium) => {
        match.size = [];
        match.size.push(stadium.rows);
        match.size.push(stadium.columns);
        console.log(stadium.rows);
        console.log(stadium.columns);
        res.status(200).json(match);
      });
    })
    .catch((err) => console.log(err));
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

//Update Match Info
const updateMatch = (req, res, next) => {
  const matchId = req.body.id;
  const homeTeam = req.body.homeTeam;
  const awayTeam = req.body.awayTeam;
  const matchVenue = req.body.matchVenue;
  const dateAndTime = req.body.dateAndTime;
  const mainReferee = req.body.mainReferee;
  const linesMen = req.body.linesMen;
  Match.findOne({ _id: matchId }).then((match) => {
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
        res.status(200).json({ result, message: "Edited Match Successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ result, message: "Match Not Updated" });
      });
  });
};

//delete a match
const deleteMatch = (req, res, next) => {
  Match.findOneAndDelete({ _id: req.body.id })
    .then((result) => {
      console.log("Match deleted Successfully");
      res.status(200).json({ message: "Match deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};
module.exports = {
  getAllMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
};
