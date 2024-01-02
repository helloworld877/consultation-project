import React from 'react';
import '../styles/paymentMethod.css';
import CustomButton from './customButton';
import Link from 'next/link';

const PaymentCard = ({ selectedPaymentMethod, handlePaymentMethodChange }) => {
  const [cardNumber, setCardNumber] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [cvv, setCVV] = React.useState('');
  const [formErrors, setFormErrors] = React.useState({
    cardNumber: '',
    expirationDate: '',
    name: '',
    cvv: '',
  });
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    setFormErrors((errors) => ({ ...errors, cardNumber: '' }));
  };

  const handleExpirationDateChange = (e) => {
    const inputDate = e.target.value;
    const sanitizedInput = inputDate.replace(/\D/g, '');
    if (sanitizedInput.length <= 4) {
      setExpirationDate(sanitizedInput.replace(/(\d{2})(\d{0,2})/, '$1/$2'));
      setFormErrors((errors) => ({ ...errors, expirationDate: '' }));
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormErrors((errors) => ({ ...errors, name: '' }));
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value.slice(0, 3));
    setFormErrors((errors) => ({ ...errors, cvv: '' }));
  };

  const handleSubmit = () => {
    const errors = {};

    if (selectedPaymentMethod === 'Card') {
      if (!cardNumber || cardNumber.length !== 16) {
        errors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!expirationDate || !/^\d{2}\/\d{2}$/.test(expirationDate)) {
        errors.expirationDate = 'Please enter a valid expiration date in MM/YY format';
      }

      if (!name) {
        errors.name = 'Please enter the name on the card';
      }

      if (!cvv || cvv.length !== 3) {
        errors.cvv = 'Please enter a valid 3-digit CVV';
      }
    }

    if (Object.values(errors).some((error) => error !== '')) {
      setFormErrors(errors);
    } else {
      // Form is valid, submit the data
      // For simplicity, just show confirmation
      setShowConfirmation(true);
      // You can add your submission logic here, e.g., API call
    }
  };

  const handleConfirmationClose = () => {
    // Reset form and close confirmation
    setCardNumber('');
    setExpirationDate('');
    setName('');
    setCVV('');
    setFormErrors({
      cardNumber: '',
      expirationDate: '',
      name: '',
      cvv: '',
    });
    setShowConfirmation(false);
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
            <span className="error-message">{formErrors.cardNumber}</span>
            <br />
            <label>
              Expiration Date:
              <input type="text" placeholder="MM/YY" value={expirationDate} onChange={handleExpirationDateChange} maxLength={5} />
            </label>
            <span className="error-message">{formErrors.expirationDate}</span>
            <br />
            <label>
              Name on Card:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <span className="error-message">{formErrors.name}</span>
            <br />
            <label>
              CVV:
              <input type="password" value={cvv} onChange={handleCVVChange} maxLength={3} />
            </label>
            <span className="error-message">{formErrors.cvv}</span>
          </div>
        </div>
      )}

      <CustomButton onClick={handleSubmit}>Checkout</CustomButton>

      {showConfirmation && (
        <div className="purchase-confirmation-dialog">
          <p>Your purchase has been confirmed!</p>
          <Link href="/viewMatches" passHref>
          <CustomButton onClick={handleConfirmationClose} className="return-to-matches-btn">Return To Matches</CustomButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
