import React from 'react';
import styles from '../styles/Receipt.css';

const ReceiptCard = ({ ticket }) => {
    return (
        <div className='receipt-container'>
            
            <div className="card">
                <h2>Receipt Details</h2>
                <div className="row-section">
                    <div className="seat-section">
                        <p><strong>Seat:</strong> {ticket.itemName}</p>
                        <p><strong>Price:</strong> {ticket.price}</p>
                        <p><strong>Quantity:</strong> {ticket.quantity}</p>
                        <p><strong>Total:</strong> {ticket.total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptCard;
