import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/customButton.css';

const CustomButton = ({ children, onClick }) => {
    return (
        <Button className="btn" onClick={onClick}>
            {children}
        </Button>
    );
};

export default CustomButton;
