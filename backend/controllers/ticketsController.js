// matchController.js
const Ticket = require("../models/tickets");
const Match = require("../models/match");

//creates a Ticket
const createTicket = (req, res, next) => {
  console.log(req.USER.result.userName);
  const ticketHolder = req.USER.result.userName;
  const matchId = req.body.matchId;
  const seats = req.body.seats;
  const updatedSeats = [];
  for (let i = 0; i < seats.length; i++) {
    console.log("These Are The Seats");
    console.log(seats[i][0]);
    console.log(seats[i][1]);
    const row = seats[i][0];
    const column = seats[i][1];
    const ticketId = ticketHolder + row + column + matchId;
    console.log(ticketId);
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
            console.log("HENAAAA");
            console.log(result);
            console.log(seats[i]);
            // updatedSeats.push(seats[i]);
            // console.log(updatedSeats);
            Match.findOne({ _id: result.matchId }).then((resultMatch) => {
              console.log("GEBT EL MATCH");
              const filter = { _id: resultMatch._id };
              const updatedSeats = resultMatch.reservedSeats;
              updatedSeats.push(seats[i]);
              const update = {
                reservedSeats: updatedSeats,
              };
              Match.findOneAndUpdate(filter, update).then((match) => {
                console.log("Match Reserved Seats Updated Successfully");
                console.log(match);
                // res.status(200).json({
                //   match,
                //   message: "Reserved Seats Updated Successfully",
                // });
              });
            });
            // .catch((err) => {
            //   console.log(err);
            //   res
            //     .status(404)
            //     .json({ err, message: "Error Updating Reserved Seats" });
            // });
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

//Cancel Ticket
const cancelTicket = (req, res, next) => {
  // const ticketId = req.body.ticketId;
  // Ticket.findOneAndDelete({ userName: req.body.userName })
  //   .then((ticket) => {
  //     if (ticket) {
  //       console.log(ticket);
  //       console.log(ticket.matchId);
  //       Match.findOne({ _id: ticket.matchId })
  //         .then((match) => {
  //           let indexToRemove = match.reservedSeats.findIndex(
  //             (subArray) =>
  //               subArray.length === 2 &&
  //               subArray.includes(ticket.seats[0]) &&
  //               subArray.includes(ticket.seats[0])
  //           );
  //           if (indexToRemove !== -1) {
  //             match.reservedSeats.splice(indexToRemove, 1);
  //           }
  //           const filter = { _id: ticket.matchId };
  //           const update = { reservedSeats: match.reservedSeats };
  //           Match.findOneAndUpdate(filter, update)
  //             .then((matchUpdated) => {
  //               console.log(matchUpdated);
  //               res.status(200).json({
  //                 matchUpdated,
  //                 message: "Match Updated Successfully",
  //               });
  //             })
  //             .catch((err) => {
  //               res.status(500).json({
  //                 err,
  //                 message: "Error Updating Match",
  //               });
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           res.status(500).json({
  //             err,
  //             message: "Error Finding Match To Update Its Seats",
  //           });
  //         });
  //       res
  //         .status(200)
  //         .json({ ticket, message: "Ticket Cancelled Successfully" });
  //     } else {
  //       res.status(404).json({ message: "This Ticket Wasn't Found" });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ err, message: "Error Cancelling Ticket" });
  //   });
};
module.exports = {
  createTicket,
  getUserTickets,
  cancelTicket,
};
