import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/accountDetails.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function AccountDetails() {
  const router = useRouter();
  const {
    username,
    firstname,
    lastname,
    email,
    gender,
    birthdate,
    role,
    address,
    city,
  } = router.query;

  const [details, setDetails] = useState({
    username: "ZiadAbdElWareth",
    firstname: "Ziad",
    lastname: "Abd El Wareth",
    email: "ziad.wareth@gmail.com",
    gender: "Male",
    birthdate: "11/12/2001",
    role: "fan",
    address: "Hadayek El Ahram",
    city: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setDetails({
        username: username || "",
        firstname: firstname || "",
        lastname: lastname || "",
        email: email || "",
        gender: gender || "",
        birthdate: birthdate || "",
        role: role || "",
        address: address || "",
      });
    }
  }, [
    router.isReady,
    username,
    firstname,
    lastname,
    email,
    gender,
    birthdate,
    role,
    address,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => {
      const newDetails = { ...prevDetails, [name]: value };
      // Check if any field is different from the placeholder (initial value)
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
      "firstname",
      "lastname",
      "birthdate",
      "gender",
      "address",
      "city",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !details[field].trim()
    );

    if (emptyFields.length > 0) {
      setError(
        `Please complete all fields. Missing: ${emptyFields.join(", ")}`
      );
      return;
    }

    // Continue with user data preparation and API call...
    const userData = {
      firstName: details.firstname,
      lastName: details.lastname,
      birthDate: new Date(details.birthdate).toISOString(),
      gender: details.gender === "Male" ? "M" : "F",
      city: details.city,
      address: details.address,
      role: details.role,
    };

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/users/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

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
            <CustomInput
              type="text"
              name="username"
              placeholder="Username"
              value={details.username}
              readOnly={true} 
            
            />
          </div>
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="firstname"
              placeholder="First Name"
              value={details.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="role"
              placeholder="Role"
              value={details.role}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Second Column */}
        <div className="column">
          <div className="input-fields-container">
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
              value={details.email}
              readOnly={true} 
            />
          </div>
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={details.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="address"
              placeholder="Address"
              value={details.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Third Column */}
        <div className="column">
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="gender"
              placeholder="Gender"
              value={details.gender}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <CustomInput
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={details.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="city"
              placeholder="City"
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
