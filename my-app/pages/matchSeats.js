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
  const router = useRouter();

  useEffect(() => {
    const matchId = router.query.matchID;
    // Make sure to use template literals correctly with backticks
    fetch(`http://localhost:8080/matches/getMatch/${matchId}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchDetails(data);
        setReservedSeats(data.reservedSeats || []);
        console.log(matchDetails);
      })
      .catch((error) => {
        console.error("Error fetching match details:", error);
      });
  }, [router.query.matchID]);

  const matchPageDetailsUrl = `/Checkout?matchID=${router.query.matchID}`;

  const handleSeatToggle = (row, col) => {
    // Use template literals with backticks correctly
    const seatId = `${row}-${col}`;
    const isSelected = selectedSeats.includes(seatId);
    const isReserved = reservedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );
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
              <header>
              <div className="button-container">
                <Link href={matchPageDetailsUrl} passHref>
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                </Link>
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
              </header>
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
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <div className="form-row">
                          {[...Array(5)].map((_, row) => (
                            <div key={row} className="seat-row">
                              {[...Array(4)].map((_, col) => {
                                const seatId = `${row}-${col}`;
                                return (
                                  <button
                                    key={seatId}
                                    className={`seat-btn ${
                                      selectedSeats.includes(seatId)
                                        ? "selected"
                                        : ""
                                    } ${
                                      reservedSeats.some(
                                        (seat) =>
                                          seat.row === row && seat.col === col
                                      )
                                        ? "reserved"
                                        : ""
                                    }`}
                                    onClick={() => handleSeatToggle(row, col)}
                                    disabled={reservedSeats.some(
                                      (seat) =>
                                        seat.row === row && seat.col === col
                                    )}
                                  >
                                    {String.fromCharCode(65 + row)}
                                    {col + 1}
                                  </button>
                                );
                              })}
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
  );
}
