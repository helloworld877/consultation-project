import React, { useState } from "react";
import "../styles/changePassword.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [passwords, setPasswords] = useState({
    userName: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState("");

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
    setIsChanged(true);
    if (passwords.userName.trim() && passwords.newPassword.trim() && passwords.confirmPassword.trim()) {
      setError("");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    if (!passwords.userName.trim() || !passwords.newPassword.trim() || !passwords.confirmPassword.trim()) {
      setError("Please complete all fields");
      return; 
    }

    const data = {
      userName: passwords.userName,
      newPassword: passwords.newPassword,
      confirmPassword: passwords.confirmPassword,
    };

    try {
      const response = await fetch("http://localhost:8080/users/forgotPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.message === "User Password Updated Successfully") {
        router.push("/"); 
      } else {
        setError(result.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      setError(error.message || "Failed to update password.");
    }
  };

  return (
    <div className="change-password-container">
      <h1>Set New Password</h1>
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
      <div className="input-fields-container">
        <CustomInput
          type="text"
          name="userName"
          placeholder="Username"
          value={passwords.userName}
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
          disabled={
            !isChanged ||
            !passwords.userName ||
            !passwords.newPassword ||
            !passwords.confirmPassword
          }
        >
          Set New Password
        </CustomButton>
      </div>
    </div>
  );
}
