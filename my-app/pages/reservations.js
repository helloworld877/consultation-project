import React from "react";
import Ticket from "../components/ticket";
import "../styles/reservations.css";
import Link from "next/link";
import CustomButton from "../components/customButton";

export default function Reservations() {
  const reservedTickets = [
    { ticketNumber: "T12345", seatNumber: "A1" },
    { ticketNumber: "T67890", seatNumber: "B3" },
    { ticketNumber: "T12345", seatNumber: "A1" },
    { ticketNumber: "T67890", seatNumber: "B3" },
  ];

  return (
    <div className="tickets-page">
      <div className="page-header">
        <h1>Reserved Tickets</h1>

        <div className="header-buttons">
          <Link href="/profile">
            <CustomButton>View Profile</CustomButton>
          </Link>
          <Link href="/viewMatches">
            <CustomButton>View Matches</CustomButton>
          </Link>
          <Link href="/">
            <CustomButton>Sign Out</CustomButton>
          </Link>
        </div>
      </div>
      <div className="tickets-view">
        {reservedTickets.map((ticket, index) => (
          <Ticket key={index} showCancelIcon={true} seatDetails={ticket} />
        ))}
      </div>
    </div>
  );
}
