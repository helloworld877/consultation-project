import React from 'react';
import paymentMethod from '../styles/paymentMethod.css';

const PaymentCard = ({ selectedPaymentMethod, handlePaymentMethodChange }) => {
  const [cardNumber, setCardNumber] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [cvv, setCVV] = React.useState('');

  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  
  const handleExpirationDateChange = (e) => {
    const inputDate = e.target.value;
    const sanitizedInput = inputDate.replace(/\D/g, '');
    if (sanitizedInput.length <= 4) {
      setExpirationDate(sanitizedInput.replace(/(\d{2})(\d{0,2})/, '$1/$2'));
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleCVVChange = (e) => {
    setCVV(e.target.value.slice(0, 3));
  };

  return (
    <div className="payment-card">
      <h2>Select Payment Method</h2>
      <label>
        <input
          type="radio"
          value="Card"
          checked={selectedPaymentMethod === 'Card'}
          onChange={() => handlePaymentMethodChange('Card')}
        />
        Card
      </label>
      <label>
        <input
          type="radio"
          value="Cash"
          checked={selectedPaymentMethod === 'Cash'}
          onChange={() => handlePaymentMethodChange('Cash')}
        />
        Cash
      </label>
      {selectedPaymentMethod === 'Card' && (
        <div className="payment-info">
        <div className="card-details">
          <label>
            Card Number:
            <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
          </label>
          <br />
          <label>
            Expiration Date:
            <input type="text" placeholder="MM/YY" value={expirationDate} onChange={handleExpirationDateChange} maxLength={5} />
          </label>
          <br />
          <label>
            Name on Card:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            CVV:
            <input type="password" value={cvv} onChange={handleCVVChange} maxLength={3} />
          </label>
        </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;