// matchController.js
const Ticket = require("../models/tickets");

//creates a Ticket
const createTicket = (req, res, next) => {
  console.log(req.USER.result.userName);
  const ticketHolder = req.USER.result.userName;
  const matchId = req.body.matchId;
  const seats = req.body.seats;
  for (let i = 0; i < seats.length; i++) {
    console.log(seats[i][0]);
    console.log(seats[i][1]);
    const row = seats[i][0];
    const column = seats[i][1];
    const ticketId = ticketHolder + row + column + matchId;
    Ticket.findOne({ ticketId: ticketId }).then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({ result, message: "Ticket Already Exists" });
      } else {
        const ticket = new Ticket({
          ticketId,
          ticketHolder,
          matchId,
          seats: seats[i],
        });
        ticket
          .save()
          .then((result) => {
            console.log("Ticket added Successfully");
            res.status(200).json({ message: "Ticket added successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
          });
      }
    });
  }
};

//Get User Tickets
const getUserTickets = (req, res, next) => {
  const userName = req.USER.result.userName;
  console.log(req.USER.result.userName);
  Ticket.find({ ticketHolder: userName })
    .then((tickets) => {
      console.log(tickets);
      res
        .status(200)
        .json({ tickets, message: "Ticket Retrieved Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err, message: "This User Has No Tickets" });
    });
};
module.exports = {
  createTicket,
  getUserTickets,
};
