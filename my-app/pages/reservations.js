import React from "react";
import Ticket from "../components/ticket";
import "../styles/reservations.css";

export default function Reservations() {
  const reservedTickets = [
    { ticketNumber: "T12345", seatNumber: "A1" },
    { ticketNumber: "T67890", seatNumber: "B3" },
  ];

  return (
    <div className="tickets-page">
      <h1>Reserved Tickets</h1>
      <div className="tickets-view">
      {reservedTickets.map((ticket, index) => (
        <Ticket key={index} showCancelIcon={true} seatDetails={ticket} />
      ))}
      </div>
    </div>
  );
}
