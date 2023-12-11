import React from 'react';
import { useState } from 'react';
import '../styles/Checkout.css';
import MatchCard from '../components/matchCard';
import Receipt from '../components/Receipt';
import PaymentCard from '../components/paymentMethod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');

  const handlePaymentMethodChange = (newPaymentMethod) => {
    setSelectedPaymentMethod(newPaymentMethod);
  };

  return (
    <div className="checkout-page">
      <div className="card-container">
        <MatchCard clickable={false} />
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
      <Link href="/matchSeats" passHref>
        {/* <a>
          <input className="back-btn" type="button" id="reg-log" name="reg-log" />
        </a>{' '} */}
      
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
