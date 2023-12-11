import React, { useState } from "react";
import "../styles/changePassword.css"; 
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function ChangePassword() {
  // State to hold the password values
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State to track if any changes have been made
  const [isChanged, setIsChanged] = useState(false);

  // Handle input changes
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
    console.log("Changing password to:", passwords.newPassword);
    setIsChanged(false);
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>
      <div className="input-fields-container">
        <CustomInput
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={passwords.oldPassword}
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
          disabled={!isChanged || !passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword}
        >
          Change Password
        </CustomButton>
      </div>
    </div>
  );
}
