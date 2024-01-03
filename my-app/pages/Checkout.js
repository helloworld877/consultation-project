import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import '../styles/Checkout.css';
import MatchCard from '../components/matchCard';
import ReceiptCard from '../components/Receipt';
import PaymentCard from '../components/paymentMethod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');
  const [matchDetails, setMatchDetails] = useState({});
  const [showPurchaseConfirmation, setShowPurchaseConfirmation] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const matchId = router.query.matchID;
    fetch(`http://localhost:8080/matches/getMatch/${matchId}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching match details:", error);
      });
  }, [router.query.matchID]);

  const handlePaymentMethodChange = (newPaymentMethod) => {
    setSelectedPaymentMethod(newPaymentMethod);
  };

  const showPurchaseConfirmationDialog = () => {
    setShowPurchaseConfirmation(true);
  };

  const hidePurchaseConfirmationDialog = () => {
    setShowPurchaseConfirmation(false);
  };


  const selectedSeats = router.query.selectedSeats ? router.query.selectedSeats.split(",") : [];
  
  const receiptDetails = selectedSeats.map((seat) => {
    const [row, col] = seat.split("-");
    const seatId = `${String.fromCharCode(65 + parseInt(row, 10))}${parseInt(col, 10)}`;
    const price = 'EGP200.00';
    return {
      itemName: seatId,
      price,
      quantity: 1,
      total: price,
      row: parseInt(row, 10),
      col: parseInt(col, 10)
    };
  });


  const matchPageDetailsUrl = `/matchSeats?matchID=${router.query.matchID}`;

  const grandTotal = receiptDetails.reduce((total, ticket) => total + parseFloat(ticket.total.replace('EGP', '')), 0);

  const handleCheckout = () => {
    showPurchaseConfirmationDialog();

    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    const matchId = router.query.matchID;
    console.log(matchId);
    const seats = router.query.selectedSeats;
    console.log(seats);

    const ticketData = {  
      ticketHolder: accessToken,
      matchId,
      seats: seats
    };
    fetch("http://localhost:8080/tickets/createTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify(ticketData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Ticket added successfully:", data);
        // Redirect or perform any other action after successful save
      })
      .catch((error) => {
        console.error("Error adding ticket:", error);
        // Handle error, display an error message, etc.
      });
      console.log(ticketData);
      console.log(data);
      console.log(response);
      console.log(JSON.stringify(ticketData));


  };

  return (
    <div className="checkout-page">
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
      <div className="receipt-container">
        {receiptDetails.map((ticket, index) => (
          <ReceiptCard key={index} ticket={ticket} />
        ))}
      </div>
      <div className="card grand-total-card">
        <h2>Grand Total</h2>
        <div className="grand-total-section">
          <p><strong>Total:</strong> EGP{grandTotal.toFixed(2)}</p>
        </div>
      </div>
      <div className="payment-container">
        <PaymentCard
          selectedPaymentMethod={selectedPaymentMethod}
          handlePaymentMethodChange={handlePaymentMethodChange}
          handleCheckout={handleCheckout} // Pass the checkout callback
        />
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
