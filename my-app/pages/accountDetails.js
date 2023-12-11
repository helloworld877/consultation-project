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
  });

  const [isChanged, setIsChanged] = useState(false);

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

  const handleSave = () => {
    // Implement your save logic here
    console.log("Saving account details:", details);

    // After saving, you might want to navigate the user away or give a success message
    // router.push('/some-success-page');
  };

  return (
    <div className="account-details">
      <h1>Account Details</h1>
      <div className="columns-container">
        <div className="column">
          {/* First Column */}
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
              name="lastname"
              placeholder="Last Name"
              value={details.lastname}
              onChange={handleChange}
            />
          </div>
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
        </div>
        <div className="column">
          {/* Second Column */}
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="role"
              placeholder="Role"
              value={details.role}
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
          <div className="input-fields-container">
            <CustomInput
              type="text"
              name="username"
              placeholder="Username"
              value={details.username}
              readOnly
            />
          </div>
          <div className="input-fields-container">
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
              value={details.email}
              readOnly
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
