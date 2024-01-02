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
    const [receiptDetails, setReceiptDetails] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const matchId = router.query.matchID;
        fetch(`http://localhost:8080/matches/getMatch/${matchId}`)
            .then((response) => response.json())
            .then((data) => {
                setMatchDetails(data);
                // Sample receipt details for testing
                setReceiptDetails([
                    {
                        itemName: 'A1',
                        price: 'EGP250.00',
                        quantity: 1,
                        total: 'EGP250.00',
                        row: 1,
                    },
                    {
                        itemName: 'B3',
                        price: 'EGP200.00',
                        quantity: 1,
                        total: 'EGP200.00',
                        row: 3,
                    },
                ]);
            })
            .catch((error) => {
                console.error("Error fetching match details:", error);
            });
    }, [router.query.matchID]);

    const handlePaymentMethodChange = (newPaymentMethod) => {
        setSelectedPaymentMethod(newPaymentMethod);
    };

    const matchPageDetailsUrl = `/matchSeats?matchID=${router.query.matchID}`;

    // Calculate the grand total for all tickets
    const grandTotal = receiptDetails.reduce((total, ticket) => total + parseFloat(ticket.total.replace('EGP', '')), 0);

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
