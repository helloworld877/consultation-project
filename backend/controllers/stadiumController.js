// stadiumController.js
const Stadium = require("../models/stadium");
//Creating a Stadium
const createStadium = (req, res, next) => {
  const name = req.body.name;
  const rows = req.body.rows;
  const columns = req.body.columns;
  const stadium = new Stadium({
    name,
    rows,
    columns,
  });
  stadium
    .save()
    .then((result) => {
      res.status(201).json({ message: "Stadium added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

//Update Stadium Info
const updateStadium = (req, res, next) => {
  const name = req.body.name;
  const rows = req.body.rows;
  const columns = req.body.columns;
  Stadium.findOne({ name: name }).then((stadium) => {
    stadium.rows = rows;
    stadium.columns = columns;
    return stadium
      .save()
      .then((result) => {
        console.log("Stadium Details Updated Successfully");
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => console.log(err));
  });
};

//Deleting a Stadium
const deleteStadium = (req, res, next) => {
  Stadium.findOneAndDelete({ _id: req.body.id })
    .then((result) => {
      console.log("Stadium deleted Successfully");
      res.status(200).json({ message: "Stadium deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  createStadium,
  updateStadium,
  deleteStadium,
};
