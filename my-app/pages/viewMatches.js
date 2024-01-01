import React, { useEffect, useState } from "react";
import MatchCard from "../components/matchCard";
import "../styles/viewMatches.css";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  function showIcon() {
    let role=localStorage.getItem("role");
    if (role === 'Manager' || role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/matches/getAllMatches")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
      });
    // write error handling for the fetch operation
  }, []);

  return (
    <div className="matches-page">
      <h1>Upcoming Matches</h1>
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
