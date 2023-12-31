import React, { useState } from "react";
import "../styles/changePassword.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function ForgotPassword() {
  const [passwords, setPasswords] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevPasswords => ({
      ...prevPasswords,
      [name]: value
    }));
    setIsChanged(true);
  };

  const handleSave = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Implement logic to handle changing the password here
    console.log("Changing password for user:", passwords.username);
    setIsChanged(false);
  };

  return (
    <div className="change-password-container">
      <h1>Set New Password</h1>
      <div className="input-fields-container">
        <CustomInput
          type="text"
          name="username"
          placeholder="Username"
          value={passwords.username}
          onChange={handleChange}
        />
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
          disabled={!isChanged || !passwords.username || !passwords.newPassword || !passwords.confirmPassword}
        >
          Set New Password
        </CustomButton>
      </div>
    </div>
  );
}
