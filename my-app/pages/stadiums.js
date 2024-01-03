import React, { useEffect, useState } from "react";
import StadiumCard from "../components/StadiumCard";
import "../styles/stadiums.css";
import Link from "next/link";

export default function Stadiums() {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/stadiums/getAllStadiums")
      .then((response) => response.json())
      .then((data) => {
        setStadiums(data.stadiums);
        console.log(data);
      });
  }, []);

  return (
    <div className="stadiums-page">
      <div className="stadiumsPage-header">
        <div className="header-buttons">
          <Link href="/addStadium">
          <img
                src="/plus.png"
                alt="Add Stadium"
                className="stadiumIcon stadiumPhoto"
                title="Add Stadium"
              />
          </Link>

          <Link href="/viewMatches">
          <img
                src="/football-field.png"
                alt="View Matches"
                className="stadiumIcon stadiumPhoto"
                title="View Matches"
              />
          </Link>
        </div>
       
        <div className="profile-button">
          <Link href="/profile">
          <img
                src="/user.png"
                alt="View Profile"
                className="stadiumIcon stadiumPhoto"
                title="View Profile"
              />
          </Link>
          <Link href="/">
          <img
                src="/logout.png"
                alt="Sign Out"
                className="stadiumIcon stadiumPhoto"
                title="Sign Out"
              />
          </Link>
        </div>
      </div>
      <div> <h1>Stadiums</h1></div>
      <div className="stadiums-grid">
        {stadiums.map((stadium) => (
          <StadiumCard
            key={stadium._id}
            _id={stadium._id}
            name={stadium.name}
            columns={stadium.columns}
            rows={stadium.rows}
            city={stadium.city}
            address={stadium.address}
            clickable={true}
            showEditIcon={false}
          />
        ))}
      </div>
    </div>
  );
}
