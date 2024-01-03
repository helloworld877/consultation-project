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
        <div className="header-buttons">
          <div className="reservationsIcon-container">
            <Link href="/profile">
              <img
                src="/user.png"
                alt="Profile"
                className="reservationsIcon reservationsPhoto"
                title="View Profile"
              />
            </Link>
            <Link href="/viewMatches">
              <img
                src="/football-field.png"
                alt="View Matches"
                className="reservationsIcon reservationsPhoto"
                title="View Matches"
              />
            </Link>
            <Link href="/">
              <img
                src="/logout.png"
                alt="Sign Out"
                className="reservationsIcon reservationsPhoto"
                title="Sign Out"
              />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h1>Reserved Tickets</h1>
      </div>
      <div className="tickets-view">
        {reservedTickets.map((ticket, index) => (
          <Ticket key={index} showCancelIcon={true} seatDetails={ticket} />
        ))}
      </div>
    </div>
  );
}
