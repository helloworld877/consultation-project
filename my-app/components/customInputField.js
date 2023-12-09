import React from 'react';
import '../styles/customInputField.css'; 

const CustomInputField = ({ type, name, placeholder, id, autoComplete, onChange }) => {
    return (
        <input
            type={type}
            name={name}
            className="form-style"
            placeholder={placeholder}
            id={id}
            autoComplete={autoComplete}
            onChange={onChange}
        />
    );
};

export default CustomInputField;
