import Ticket from "../components/ticket";
import "../styles/reservations.css";
import Link from "next/link";
import CustomButton from "../components/customButton";
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
