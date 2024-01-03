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
  const id = req.params.id;
  // console.log(id);
  Match.findOne({ _id: id })
    .lean()
    .then((match) => {
      console.log(match.matchVenue);
      console.log(match.reservedSeats[0]);
      Stadium.findOne({ name: match.matchVenue }).then((stadium) => {
        console.log(stadium);
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
//Adding a Match
const createMatch = (req, res, next) => {
  const { homeTeam, awayTeam, matchVenue, dateAndTime, mainReferee, linesMen } =
    req.body;

  // Check for existing match conflicts
  Match.findOne({
    $or: [
      { mainReferee: mainReferee },
      { homeTeam: homeTeam },
      { awayTeam: awayTeam },
      { matchVenue: matchVenue },
      { linesMen: { $in: linesMen } },
    ],
    dateAndTime: { $eq: dateAndTime }, // Uncomment if you want to check for the specific date and time as well
  })
    .then((existingMatch) => {
      if (existingMatch) {
        return res
          .status(400)
          .json({ message: "There is a conflict with an existing match." });
      }

      // If no conflicts, create the new match
      const match = new Match({
        homeTeam,
        awayTeam,
        matchVenue,
        dateAndTime,
        mainReferee,
        linesMen,
      });

      return match.save();
    })
    .then((result) => {
      if (result) {
        res.status(201).json({ message: "Match added successfully" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

// const createMatch = (req, res, next) => {
//   const homeTeam = req.body.homeTeam;
//   const awayTeam = req.body.awayTeam;
//   const matchVenue = req.body.matchVenue;
//   const dateAndTime = req.body.dateAndTime;
//   const mainReferee = req.body.mainReferee;
//   const linesMen = req.body.linesMen;
//   const match = new Match({
//     homeTeam,
//     awayTeam,
//     matchVenue,
//     dateAndTime,
//     mainReferee,
//     linesMen,
//   });

//   match
//     .save()
//     .then((result) => {
//       res.status(201).json({ message: "Match added successfully" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err.message });
//     });
// };

const updateMatchValidate = (req, res, next) => {
  const matchId = req.body.id;
  const homeTeam = req.body.homeTeam;
  const awayTeam = req.body.awayTeam;
  const matchVenue = req.body.matchVenue;
  const dateAndTime = req.body.dateAndTime;
  const mainReferee = req.body.mainReferee;
  const linesMen = req.body.linesMen;
  let reservedSeats;
  let match_venue_original;

  // Assuming Match and Stadium are your Mongoose models for matches and stadiums respectively
  Match.findOne({ _id: matchId })
    .then((match) => {
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }

      // Update matchVenue and reservedSeats
      match_venue_original = match.matchVenue;
      reservedSeats = match.reservedSeats;
    })
    .then((updatedMatch) => {
      // Find the stadium with the given name
      console.log(matchVenue);
      return Stadium.findOne({ name: matchVenue });
    })
    .then((foundStadium) => {
      if (!foundStadium) {
        // Handle case where the stadium with the given name is not found
        return res.status(404).json({ error: "Stadium not found" });
      }

      // Perform operations using the found stadium document
      console.log("Found stadium:", foundStadium);

      const rows = foundStadium.rows;
      const cols = foundStadium.columns;
      console.log(reservedSeats);
      for (let seat of reservedSeats) {
        // console.log(`seats[0]${seat[0]} seats[1]${seat[1]}`);
        if (seat[0] > rows - 1 || seat[1] > cols - 1) {
          return res.status(400).json({
            message: "invalid new stadium size",
          });
        }
      }

      next();
    })
    .catch((error) => {
      // Handle any errors that may occur during the process
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the match" });
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
        res.status(500).json({ err, message: "Match Not Updated" });
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
  updateMatchValidate,
};
