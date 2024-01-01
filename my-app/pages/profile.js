import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/profile.css";

export default function Profile() {
 
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


  const userProfileImage = "/images/football.jpg";
  useEffect(() => {
    fetchDetails();
  }, []);

  
    console.log('HA FETCHH');
    
  const fetchDetails = async (e) => {
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
      const formattedBirthDate = data.birthDate
        ? data.birthDate.split("T")[0]
        : "";

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
    
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info">
        <div className="user-details">
          <img src={userProfileImage} alt="Profile" className="profile-image" />
          <div className="name-role">
            <div className="name">{`${details.firstName} ${details.lastName}`}</div>
            <div className="role">{details.role}</div>
          </div>
        </div>
        <div className="links">
          <Link href="/accountDetails" passHref>
            <h1 className="link accountDetails">View Account Details</h1>
          </Link>

          <Link href="/changePassword" passHref>
            <h1 className="link changePassword">Change Password</h1>
          </Link>

          <Link href="/reservations" passHref>
            <h1 className="link reservations">View Tickets</h1>
          </Link>
          <Link href="/" passHref>
            <h1 className="link logOut">Log Out</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
