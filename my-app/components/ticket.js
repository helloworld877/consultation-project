import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/ticket.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faEdit } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./customButton";

const Ticket = ({ clickable = false, showCancelIcon, ticketNumber, seatNumber, matchId }) => {
  const router = useRouter();
  const [matchDetails, setMatchDetails] = useState({});
  const [isCancelConfirmationVisible, setCancelConfirmationVisible] = useState(false);
  const [linesMenString, setLinesMenString] = useState("");
  useEffect(() => {
    
    fetch(`http://localhost:8080/matches/getMatch/${matchId}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchDetails(data);
        console.log(matchDetails);
        setLinesMenString(data.linesMen.join(", "));

      })
      .catch((error) => {
        console.error("Error fetching match details:", error);
      });
  }, [router.query.matchID]);



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

  const date = new Date(matchDetails.dateAndTime);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
 
  return (
    <div className="card">
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
          <strong>Venue:</strong> {matchDetails.matchVenue}
        </p>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Time:</strong> {formattedTime}
        </p>
        <p>
          <strong>Main Referee:</strong> {matchDetails.mainReferee}
        </p>
        <p>
          <strong>Linesmen:</strong> {linesMenString}
        </p>

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
