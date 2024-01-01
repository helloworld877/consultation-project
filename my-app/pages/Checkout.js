import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import '../styles/Checkout.css';
import MatchCard from '../components/matchCard';
import Receipt from '../components/Receipt';
import PaymentCard from '../components/paymentMethod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');
  const [matchDetails, setMatchDetails] = useState({});
  const router = useRouter();
  const handlePaymentMethodChange = (newPaymentMethod) => {
    setSelectedPaymentMethod(newPaymentMethod);
  };
  useEffect(() => {
    const matchId = router.query.matchID;
    // Make sure to use template literals correctly with backticks
    fetch(`http://localhost:8080/matches/getMatch/${matchId}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching match details:", error);
      });
  }, [router.query.matchID]);
  const matchPageDetailsUrl = `/matchSeats?matchID=${router.query.matchID}`;

  return (
    <div className="checkout-page">
      <div className="card-container">
        <MatchCard homeTeam = {matchDetails.homeTeam}
                    awayTeam = {matchDetails.awayTeam}
                    matchVenue={matchDetails.matchVenue}
                    dateAndTime={matchDetails.dateAndTime}
                    mainReferee={matchDetails.mainReferee}
                    linesMen={matchDetails.linesMen}
                    clickable={false}
                    showEditIcon={false} />
      </div>
      <div className="receipt-container">
        <Receipt />
      </div>
      <div className="payment-container">
        <PaymentCard
          selectedPaymentMethod={selectedPaymentMethod}
          handlePaymentMethodChange={handlePaymentMethodChange}
        />
      </div>
      <div className="button-container">
        <button className="checkout-btn">Checkout</button>
      </div>
      <Link href={matchPageDetailsUrl} passHref>
      <div className="back-btn-container">
        <label htmlFor="reg-log" className="back-btn-label">
          <FontAwesomeIcon icon={faArrowLeft} className="back-btn-icon" />
        </label>
        <span className="back-btn-label-text">Return To Seats</span>
      </div>
      </Link>
    </div>
  );
}
