import React, { useState } from "react";
import "../styles/changePassword.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [passwords, setPasswords] = useState({
    username: "",
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
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    if (!passwords.username.trim() || !passwords.newPassword.trim() || !passwords.confirmPassword.trim()) {
      setError("Please complete all fields");
      return; 
    }

    const data = {
      username: passwords.username,
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
        setError("Failed to update password: " + result.message);
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      setError("Failed to update password.");
    }
  };

  return (
    <div className="change-password-container">
      <h1>Set New Password</h1>
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
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
          disabled={
            !isChanged ||
            !passwords.username ||
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
