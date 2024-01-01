import React, { useState } from "react";
import "../styles/changePassword.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";
import { useRouter } from "next/navigation";


export default function ChangePassword() {
  // State to hold the password values
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();

  // State to track if any changes have been made
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
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
    if (
      !passwords.oldPassword.trim() ||
      !passwords.newPassword.trim() ||
      !passwords.confirmPassword.trim()
    ) {
      setError("Please complete all fields");
      return;
    }

    const data = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
      confirmPassword: passwords.confirmPassword,
    };

    try {
      const accessToken = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/users/changePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.message === "User Password Changed Successfully") {
        router.push("/profile");
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
      <h1>Change Password</h1>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
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
          disabled={
            !isChanged ||
            !passwords.oldPassword ||
            !passwords.newPassword ||
            !passwords.confirmPassword
          }
        >
          Change Password
        </CustomButton>
      </div>
    </div>
  );
}
