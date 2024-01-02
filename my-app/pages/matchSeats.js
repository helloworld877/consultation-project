// Seats component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MatchCard from "../components/matchCard";
import "../styles/matchSeats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Seats() {
  const [matchDetails, setMatchDetails] = useState({});
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [stadiumSize, setStadiumSize] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const matchId = router.query.matchID;
    fetch(`http://localhost:8080/matches/getMatch/${matchId}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchDetails(data);
        setReservedSeats(data.reservedSeats || []);
        let size = data.reservedSeats.length;
        let allReservedSeats = new Array(size);
        if (data.reservedSeats) {
          for (let i = 0; i < data.reservedSeats.length; i++) {
            const row = data.reservedSeats[i][0];
            const col = data.reservedSeats[i][1];
            const seatId = `${row}-${col}`;
            allReservedSeats.push(seatId);
          }
          function showIcon() {
            let role = localStorage.getItem("role");
            return role === "Manager" || role === "Admin";
          }
          setIsManager(showIcon());
        }
        setReservedSeats(allReservedSeats);
        setStadiumSize(data.size || []);
      })
      .catch((error) => {
        console.error("Error fetching match details:", error);
      });
  }, [router.query.matchID]);

  const matchPageDetailsUrl = `/Checkout?matchID=${router.query.matchID}&selectedSeats=${selectedSeats.join(",")}`;

  const handleSeatToggle = (row, col) => {
    if (isManager) {
      return;
    }
    const seatId = `${row}-${col}`;
    const isSelected = selectedSeats.includes(seatId);
    const isReserved = reservedSeats.includes(seatId);

    if (isReserved) return;

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="page-container">

      <div className="section">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <div className="button-container">
                {!isManager && (
                  <Link href={matchPageDetailsUrl} passHref>
                    <button type="button" className="checkout-btn-matches">
                      Checkout
                    </button>
                  </Link>
                )}
              </div>
              <Link href="/viewMatches" passHref>
                <div className="back-btn-container">
                  <label htmlFor="reg-log" className="back-btn-label">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="back-btn-icon"
                    />
                  </label>
                  <span className="back-btn-label-text">Return To Matches</span>
                </div>
              </Link>
              <div className="card-container">
                <MatchCard
                  homeTeam={matchDetails.homeTeam}
                  awayTeam={matchDetails.awayTeam}
                  matchVenue={matchDetails.matchVenue}
                  dateAndTime={matchDetails.dateAndTime}
                  mainReferee={matchDetails.mainReferee}
                  linesMen={matchDetails.linesMen}
                  clickable={false}
                  showEditIcon={false}
                />
              </div>
              <div className="seats">
                {[...Array(stadiumSize[0])].map((_, row) => (
                  <div key={row} className="seat-row">
                    {[...Array(stadiumSize[1])].map((_, col) => {
                      const seatId = `${row}-${col}`;
                      const isReserved = reservedSeats.includes(seatId);
                      return (
                        <button
                          key={seatId}
                          className={`seat-btn ${
                            selectedSeats.includes(seatId) ? "selected" : ""
                          } ${isReserved ? "reserved" : ""}`}
                          onClick={() => handleSeatToggle(row, col)}
                          disabled={isReserved}
                        >
                          {String.fromCharCode(65 + row)}
                          {col + 1}
                        </button>
                      );
                    }).reverse()}
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
