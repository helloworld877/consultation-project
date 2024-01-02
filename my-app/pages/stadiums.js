import React, { useEffect, useState } from "react";
import MatchCard from "../components/StadiumCard";
import "../styles/stadiums.css";
import Link from "next/link";
import CustomButton from "../components/customButton";

export default function Matches() {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/stadiums/getAllStadiums")
      .then((response) => response.json())
      .then((data) => {
        setStadiums(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="stadiums-page">
      <div className="page-header">
        <div className="header-buttons">
            <Link href="/addStadium">
              <CustomButton>+ Add Stadium</CustomButton>
            </Link>
          
            <Link href="/viewMatches">
              <CustomButton>View Matches</CustomButton>
            </Link>
          
        </div>
        <h1>Stadiums</h1>
        <div className="profile-button">
          <Link href="/profile">
            <CustomButton>View Profile</CustomButton>
          </Link>
          <Link href="/">
            <CustomButton>Sign Out</CustomButton>
          </Link>
        </div>
      </div>
      <div className="stadiums-grid">
        {/* {stadiums.map((stadium) => (
          <StadiumCard
            key={stadium._id}
            _id={stadium._id}
            name={stadium.name}
            columns={stadium.columns}
            rows={stadium.rows}
            clickable={true}
            showEditIcon={true}
          />
        ))} */}
      </div>
    </div>
  );
}
