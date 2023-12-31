import React, { useState } from "react";
import "../styles/changePassword.css"; 
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function ForgotPassword() {
  // Updated state to hold only the new password values
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Other states remain the same
  const [isChanged, setIsChanged] = useState(false);

  // Updated handleChange to reflect the new state structure
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevPasswords => ({
      ...prevPasswords,
      [name]: value
    }));
    setIsChanged(true);
  };

  // Updated handleSave for only new password confirmation
  const handleSave = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Setting new password to:", passwords.newPassword);
    // Add here the logic for changing the password
    setIsChanged(false);
  };

  return (
    <div className="change-password-container">
      <h1>Set New Password</h1>
      <div className="input-fields-container">
        <CustomInput
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
        />
        <CustomInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="custom-button-container">
        <CustomButton
          onClick={handleSave}
          style={{ backgroundColor: isChanged ? "blue" : "grey" }} 
          disabled={!isChanged || !passwords.newPassword || !passwords.confirmPassword}
        >
          Set New Password
        </CustomButton>
      </div>
    </div>
  );
}
