import React, { useEffect, useState } from "react";
import MatchCard from "../components/matchCard";
import "../styles/viewMatches.css";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/matches/getAllMatches")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
      });
  }, []);

  return (
    <div className="matches-page">
      <div className="page-header">
        <h1  style={{ textAlign: 'center', width: '100%' }}>Past Matches</h1>
      </div>
      <div className="matches-grid">
        {matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard
              key={match.id}
              {...match}
              showEditIcon={false}
              clickable={false}
            />
          ))
        ) : (
          <p>No matches available at this time.</p>
        )}
      </div>
    </div>
  );
}
