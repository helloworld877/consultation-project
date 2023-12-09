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

    const groupedReceiptDetails = receiptDetails.reduce((result, seat) => {
        const rowNumber = seat.row;
        if (!result[rowNumber]) {
            result[rowNumber] = [];
        }
        result[rowNumber].push(seat);
        return result;
    }, {});

    // Calculate the grand total
    const grandTotal = receiptDetails.reduce((total, seat) => total + parseFloat(seat.total.replace('EGP', '')), 0);

    return (
        <div className="card">
            <h2>Receipt Details</h2>
            {Object.entries(groupedReceiptDetails).map(([row, seats]) => (
                <div key={row} className="row-section">
                    <h3>Row {row}</h3>
                    {seats.map((seat, index) => (
                        <div key={index} className="seat-section">
                            <p><strong>Seat:</strong> {seat.itemName}</p>
                            <p><strong>Price:</strong> {seat.price}</p>
                            <p><strong>Quantity:</strong> {seat.quantity}</p>
                            <p><strong>Total:</strong> {seat.total}</p>
                        </div>
                    ))}
                </div>
            ))}
            <div className="grand-total-section">
                <h3>Grand Total</h3>
                <p><strong>Total:</strong> EGP{grandTotal.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ReceiptCard;
