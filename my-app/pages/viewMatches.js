import React, { useEffect, useState } from "react";
import MatchCard from "../components/matchCard";
import "../styles/viewMatches.css";
import Link from "next/link";

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
        <div className="icon-container">
          {isManager && (
            <Link href="/addMatch">
              <img
                src="/match-box.png"
                alt="Add Match"
                className="icon photo"
                title="Add Match"
              />
            </Link>
          )}
          {isManager && (
            <Link href="/stadiums">
              <img
                src="/stadium.png"
                alt="View Stadiums"
                className="icon photo"
                title="View Stadiums"
              />
            </Link>
          )}
          <Link href="/profile">
            <img
              src="/user.png"
              alt="Profile"
              className="icon photo"
              title="View Profile"
            />
          </Link>
          <Link href="/">
            <img
              src="/logout.png"
              alt="Sign Out"
              className="icon photo"
              title="Sign Out"
            />
          </Link>
        </div>
      </div>
      <div>
        <h1>Upcoming Matches</h1>
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
