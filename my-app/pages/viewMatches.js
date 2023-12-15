import React from "react";
import MatchCard from "../components/matchCard";
import "../styles/viewMatches.css";
import CustomButton from "../components/customButton";
import Link from "next/link";

export default function Matches() {
  return (
    <div className="matches-page">
      <h1>Upcoming Matches</h1>
      <div className="add-match-button">
        <Link href="/addMatch">
          <CustomButton>+ Add Match</CustomButton>
        </Link>
      </div>
      <div className="add-stadium-button">
        <Link href="/addStadium">
          <CustomButton>+ Add Stadium</CustomButton>
        </Link>
      </div>
      <div className="view-account-button">
        <Link href="/profile">
          <CustomButton>Account</CustomButton>
        </Link>
      </div>
      <MatchCard showEditIcon={true} />
    </div>
  );
}