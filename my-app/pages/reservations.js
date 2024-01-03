import Ticket from "../components/ticket";
import "../styles/reservations.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Reservations() {
  const [reservedTickets, setReservedTickets] = useState([]);
  const [seatNumbers, setSeatNumbers] = useState([]);
  const [ticketIds, setTicketIds] = useState([]);
  const [matchIds, setMatchIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tickets/getUsersTickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setReservedTickets(result.tickets);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);
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
        {reservedTickets?.map((ticket, _index) => (
          <Ticket
            key={_index}
            showCancelIcon={true}
            ticketNumber={ticket.ticketId}
            seatNumber={ticket.seats}
            matchId={ticket.matchId}
          />
        ))}
      </div>
    </div>
  );
}
