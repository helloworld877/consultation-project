"use client";
import React from "react";
import {useState} from "react";
import "../styles/matchSeats.css";
import MatchCard from '../components/matchCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const matchDetails = {
    homeTeam: 'Al Ahly',
    awayTeam: 'Zamalek',
    venue: 'Cairo International Stadium',
    dateTime: '2023-12-31 20:00',
    mainReferee: 'Gehad Grisha',
    linesmen: ['Mahmoud Abouelregal', 'Tahssen Bedyer']
};
const homeTeamImageUrl = '/images/ahly.png'; 
const awayTeamImageUrl = '/images/Zamalek.png'; 
const reservedSeats = [{row:0 , col:0},{row:1 , col:2}];
export default function Seats() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatToggle = (row, col) => {
    const seatId = `${row}-${col}`;
    const isSelected = selectedSeats.includes(seatId);
    const isReserved= reservedSeats.some(seat => seat.row === row && seat.col === col);
    if(isReserved) return;

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  return (
    <div className="page-container">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <div className="button-container">
                    <Link href="/Checkout">
                    {/* <a>
                  <button className="checkout-btn">Checkout</button>
                  </a>{" "} */}
                  <button type="button" class="checkout-btn">Checkout</button>
                  </Link>
                </div>
                
                <Link href="/viewMatches" passHref> 
                {/* <a>
                <input
                  className="back-btn"
                  type="button"
                  id="reg-log"
                  name="reg-log"
                />
                </a>{" "} */}
                
                <div className="back-btn-container">
                  <label
                    htmlFor="reg-log"
                    className="back-btn-label"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="back-btn-icon"
                    />
                  </label>
                  <span className="back-btn-label-text">Return To Matches</span>
                  
                </div>
                </Link>
                <div className="card-container">
                <MatchCard clickable={false} />

                </div>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
      
                        <div className="form-row">
                  {[...Array(5)].map((_, row) => (
                    <div key={row} className="form-column">
                      {[...Array(4)].map((_, col) => (
                        <label
                        key={col}
                        className={`seat-btn ${
                          selectedSeats.includes(`${row}-${col}`)
                            ? "selected"
                            : reservedSeats.some(seat => seat.row === row && seat.col === col)
                            ? "reserved"
                            : ""
                        }`}
                      >
                          <input
                            type="checkbox"
                            className="check-seat-btn"
                            id={`seat-${row}-${col}`}
                            onChange={() => handleSeatToggle(row, col)}
                          />
                          {String.fromCharCode(65 + row)}
                          {col + 1}
                          </label>
                          )).reverse()}
                          </div>
                          ))}
                          </div>
                        
                          <div className="form-row">
                          <button className="field-btn">Stadium Field</button>  
                      
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
