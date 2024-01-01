import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/accountDetails.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function AccountDetails() {
  const router = useRouter();

  const [details, setDetails] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    gender: "",
    birthDate: "",
    role: "",
    address: "",
    city: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async (e) => {
   
    setError("");
    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/users/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      });
      console.log("TOKEN FEL PROFILE");
      console.log(`bearer ${accessToken}`);

      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }

      const data = await response.json();
      console.log(data);
      const formattedBirthDate = data.birthDate ? data.birthDate.split("T")[0] : ""; 

      console.log("FORMATTED DATE YA NAS B2A");
      console.log(formattedBirthDate);
      setDetails({
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        gender: data.gender,
        birthDate: formattedBirthDate,
        role: data.role,
        address: data.address,
        city: data.city,
      });
      console.log(details.userName);
      console.log(details.firstName);
      console.log(details.birthDate);
    } catch (error) {
      console.error("There was an error fetching the account details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => {
      const newDetails = { ...prevDetails, [name]: value };
      const changed = Object.keys(newDetails).some(
        (key) => newDetails[key] !== (router.query[key] || "")
      );
      setIsChanged(changed);
      return newDetails;
    });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "firstName",
      "lastName",
      "birthDate",
      "gender",
      "address",
      "city",
      "role",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !details[field] || !details[field].trim()
    );
    if (emptyFields.length > 0) {
      setError(
        `Please complete all fields. `
      );
      return;
    }
    const userData = {
      firstName: details.firstName,
      lastName: details.lastName,
      birthDate: `${details.birthDate}T00:00:00.000+00:00`,      
      gender: details.gender === "Male" ? "M" : "F",
      city: details.city,
      address: details.address,
      role: details.role,
    };
    console.log("UPDATEEE USER DETAILS");
    console.log(userData.firstName);
    console.log(userData.lastName);
    console.log(userData.birthDate);
    console.log(userData.gender);
    console.log(userData.city);
    console.log(userData.address);
    console.log(userData.role);
    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/users/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });
      console.log(`bearer ${accessToken}`);

      const result = await response.json();

      if (result.message === "User Info Updated successfully") {
        router.push("/profile");
      } else {
        setError(result.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Failed to update account details:", error);
      setError(error.message || "Failed to update account details.");
    }
  };

  return (
    <div className="account-details">
      <h1>Account Details</h1>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      <div className="columns-container">
        {/* First Column */}
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Username:</label>
            </div>
            <CustomInput
              type="text"
              name="userName"
              placeholder={details.userName || "Username"}
              value={details.userName}
              readOnly={true}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Firstname:</label>
            </div>
            <CustomInput
              type="text"
              name="firstName"
              placeholder={details.firstName || "First Name"}
              value={details.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Role:</label>
            </div>
            <CustomInput
              type="text"
              name="role"
              placeholder={details.role || "Role"}
              value={details.role}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Second Column */}
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Email:</label>
            </div>
            <CustomInput
              type="email"
              name="emailAddress"
              placeholder={details.emailAddress || "Email"}
              value={details.emailAddress}
              readOnly={true}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Lastname:</label>
            </div>
            <CustomInput
              type="text"
              name="lastName"
              placeholder={details.lastName || "Last Name"}
              value={details.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Address:</label>
            </div>
            <CustomInput
              type="text"
              name="address"
              placeholder={details.address || "Adsress"}
              value={details.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Third Column */}
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Gender:</label>
            </div>
            <CustomInput
              type="text"
              name="gender"
              placeholder={details.gender || "Gender"}
              value={details.gender}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Birthdate:</label>
            </div>
            <CustomInput
              type="text"
              name="birthDate"
              placeholder={details.birthDate || "Birthdate"}
              value={details.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">City:</label>
            </div>
            <CustomInput
              type="text"
              name="city"
              placeholder={details.city || "City"}
              value={details.city}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="custom-button-container">
        <CustomButton
          onClick={handleSave}
          style={{
            backgroundColor: isChanged ? "pink" : "grey",
          }}
          disabled={!isChanged}
        >
          Save
        </CustomButton>
      </div>
    </div>
  );
}
