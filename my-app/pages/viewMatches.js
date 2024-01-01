import React, { useEffect, useState } from "react";
import MatchCard from "../components/matchCard";
import "../styles/viewMatches.css";
import Link from "next/link";
import CustomButton from "../components/customButton";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  function showIcon() {
    let role = localStorage.getItem("role");
    return role === "Manager" || role === "Admin";
  }

  useEffect(() => {
    fetch("http://localhost:8080/matches/getAllMatches")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
      });
  }, []);

  const isManager = showIcon();

  return (
    <div className="matches-page">
      <div className="page-header">
      <div className="header-buttons">
          {isManager && (
            <Link href="/addStadium">
              <CustomButton>+ Add Stadium</CustomButton>
            </Link>
          )}
          {isManager && (
            <Link href="/addMatch">
              <CustomButton>+ Add Match</CustomButton>
            </Link>
          )}
        </div>
        <h1>Upcoming Matches</h1>
        <div className="profile-button">
          <Link href="/profile">
            <CustomButton >View Profile</CustomButton>
          </Link>
          <Link href="/">
            <CustomButton >Sign Out</CustomButton>
          </Link>
        </div>
        
        
      </div>
      <div className="matches-grid">
        {matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard
              key={match.id}
              {...match}
              showEditIcon={showIcon()}
              clickable={true}
            />
          ))
        ) : (
          <p>No matches available at this time.</p>
        )}
      </div>
    </div>
  );
}
