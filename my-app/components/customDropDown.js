// CustomDropdown.js
import React from 'react';
import '../styles/CustomDropdown.css';

const CustomDropdown = ({ name, options, placeholder, id, onChange, value }) => {
  const handleSelectChange = (event) => {
    const selectedOption = options.find(option => option.value === event.target.value);
    onChange(selectedOption);
  };

  return (
    <div style={{ position: 'relative' }}>
      <select
        name={name}
        className="form-style-dropdown"
        id={id}
        onChange={handleSelectChange}
        value={value ? value.value : ''}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
