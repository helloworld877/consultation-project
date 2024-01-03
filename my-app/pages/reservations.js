import Ticket from "../components/ticket";
import "../styles/reservations.css";
import Link from "next/link";
import CustomButton from "../components/customButton";
import React, { useEffect, useState } from "react";

export default function Reservations() {
  const [reservedTickets, setReservedTickets] = useState([]);
  const [seatNumbers, setSeatNumbers] = useState([]);
  const [ticketIds, setTicketIds] = useState([]);
  const [matchId, setMatchId] = useState("");

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
        const ticketsLength = result.tickets.length;
        console.log(ticketsLength);
        ticketIds.length = 0;
        for (let i = 0; i < ticketsLength; i++) {
          reservedTickets.push(result.tickets[i]);
          ticketIds.push(result.tickets[i].ticketId);
        }
        setMatchId(result.tickets[0].matchId);
        setTicketIds(ticketIds);
        setReservedTickets(reservedTickets);
        console.log(reservedTickets);
        console.log(ticketIds);

        const allSeatNumbersRows = [];
        const allSeatNumbersColumns = [];
        for (let j = 0; j < ticketsLength; j++) {
          allSeatNumbersRows.push(result.tickets[j].seats[0]);
          allSeatNumbersColumns.push(result.tickets[j].seats[1]);
        }

        console.log(allSeatNumbersRows);
        console.log(allSeatNumbersColumns);

        const allSeatNumbers = [];
        for (let k = 0; k < ticketsLength; k++) {
          allSeatNumbers.push(
            String.fromCharCode(65 + parseInt(allSeatNumbersRows[k], 10)) +
              parseInt(allSeatNumbersColumns[k] + 1, 10)
          );
        }
        console.log(allSeatNumbers);
        setSeatNumbers(allSeatNumbers);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  console.log(ticketIds);
  console.log(seatNumbers);
  console.log(matchId);

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
          <Ticket
            key={index}
            showCancelIcon={true}
            ticketNumber={ticketIds[index]}
            seatNumber={seatNumbers[index]}
            matchId={matchId}
          />
        ))}
      </div>
    </div>
  );
}
