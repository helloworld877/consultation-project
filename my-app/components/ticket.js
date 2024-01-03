import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/ticket.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faEdit } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./customButton";

const Ticket = ({ clickable = false, showCancelIcon, ticketNumber, seatNumber, matchId }) => {
  const router = useRouter();

  const matchDetails = {
    homeTeam: "Al Ahly",
    awayTeam: "Zamalek",
    venue: "Cairo International Stadium",
    dateTime: "2023-12-31 20:00",
    mainReferee: "Gehad Grisha",
    linesmen: ["Mahmoud Abouelregal", "Tahssen Bedyer"],
  };

  const [isCancelConfirmationVisible, setCancelConfirmationVisible] = useState(false);


  const onCancel = () => {
    setCancelConfirmationVisible(true);
  };

  const onConfirmCancel = () => {
    setCancelConfirmationVisible(false);
  };

  const onCancelCancel = () => {
    setCancelConfirmationVisible(false);
  };

  const homeTeamImageUrl = "/images/ahly.png";
  const awayTeamImageUrl = "/images/Zamalek.png";

  const matchPageDetailsUrl = `/matchSeats?homeTeam=${
    matchDetails.homeTeam
  }&awayTeam=${matchDetails.awayTeam}&venue=${matchDetails.venue}&dateTime=${
    matchDetails.dateTime
  }&mainReferee=${matchDetails.mainReferee}&linesmen=${encodeURIComponent(
    matchDetails.linesmen.join(", ")
  )}`;

  return (
    <div className={`card ${clickable ? "clickable" : "unclickable"}`}>
      <div className="cancel-icon-container" onClick={onCancel}>
        <FontAwesomeIcon icon={faCancel} className="cancelIcon" />
      </div>

      <div className="ticket-details">
        <p>
          <strong>Ticket ID:</strong> {ticketNumber}
        </p>
        <p>
          <strong>Seat Number:</strong> {seatNumber}
        </p>
      </div>

      <a href={clickable ? matchPageDetailsUrl : undefined} className="match-link">
        <div className="logos-container">
          <img
            src={homeTeamImageUrl}
            alt={`${matchDetails.homeTeam} Logo`}
            className="team-logo"
          />
          <div className="vs">VS</div>
          <img
            src={awayTeamImageUrl}
            alt={`${matchDetails.awayTeam} Logo`}
            className="team-logo"
          />
        </div>
        <h3>
          {matchDetails.homeTeam} vs {matchDetails.awayTeam}
        </h3>
        <p>
          <strong>Venue:</strong> {matchDetails.venue}
        </p>
        <p>
          <strong>Date & Time:</strong> {matchDetails.dateTime}
        </p>
        <p>
          <strong>Main Referee:</strong> {matchDetails.mainReferee}
        </p>
        <p>
          <strong>Linesmen:</strong> {matchDetails.linesmen.join(", ")}
        </p>
      </a>

      {isCancelConfirmationVisible && (
        <div className="cancel-confirmation-dialog">
          <p>Are you sure you want to cancel this ticket?</p>
          <CustomButton onClick={onConfirmCancel}>Confirm</CustomButton>
          <CustomButton onClick={onCancelCancel}>Cancel</CustomButton>
        </div>
      )}
    </div>
  );
};

export default Ticket;
