import React from 'react';
import styles from '../styles/Receipt.css';

const ReceiptCard = () => {
    const receiptDetails = [
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
    ];

    // Calculate the grand total for all tickets
    const grandTotal = receiptDetails.reduce((total, seat) => total + parseFloat(seat.total.replace('EGP', '')), 0);

    return (
        <div>
            {receiptDetails.map((ticket, index) => (
                <div key={index} className="card">
                    <h2>Receipt Details</h2>
                    <div className="row-section">
                        <h3>Row {ticket.row}</h3>
                        <div className="seat-section">
                            <p><strong>Seat:</strong> {ticket.itemName}</p>
                            <p><strong>Price:</strong> {ticket.price}</p>
                            <p><strong>Quantity:</strong> {ticket.quantity}</p>
                            <p><strong>Total:</strong> {ticket.total}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="card grand-total-card">
                <h2>Grand Total</h2>
                <div className="grand-total-section">
                    <p><strong>Total:</strong> EGP{grandTotal.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default ReceiptCard;
