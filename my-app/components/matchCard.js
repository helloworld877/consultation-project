import React from "react";
import Link from "next/link";
import styles from "../styles/matchCard.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const MatchCard = ({
  homeTeam,
  awayTeam,
  matchVenue,
  dateAndTime,
  mainReferee,
  linesMen,
  clickable = true,
  showEditIcon,
}) => {
  const router = useRouter();

  const matchDetails = {
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    venue: matchVenue,
    dateTime: dateAndTime,
    mainReferee: mainReferee,
    linesmen: linesMen,
  };

  const onEdit = () => {
    const editUrl = `/editMatch?homeTeam=${encodeURIComponent(
      matchDetails.homeTeam
    )}&awayTeam=${encodeURIComponent(
      matchDetails.awayTeam
    )}&venue=${encodeURIComponent(
      matchDetails.venue
    )}&dateTime=${encodeURIComponent(
      matchDetails.dateTime
    )}&mainReferee=${encodeURIComponent(
      matchDetails.mainReferee
    )}&linesmen=${encodeURIComponent(matchDetails.linesmen.join(", "))}`;
    router.push(editUrl);
  };
  const date = new Date(dateAndTime);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // Adjust the locale and options as needed
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }); // Adjust the locale and options as needed

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
      {showEditIcon && (
        <div className="edit-icon-container" onClick={onEdit}>
          <FontAwesomeIcon icon={faEdit} className="editIcon" />
        </div>
      )}
      <a
        href={clickable ? matchPageDetailsUrl : undefined}
        className="match-link"
      >
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
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Time:</strong> {formattedTime}
        </p>
        <p>
          <strong>Main Referee:</strong> {matchDetails.mainReferee}
        </p>
        <p>
          <strong>Linesmen:</strong> {matchDetails.linesmen.join(", ")}
        </p>
      </a>
    </div>
  );
};

export default MatchCard;
