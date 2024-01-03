import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/profile.css";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [logoutError, setLogoutError] = useState("");
  const [role, setRole] = useState("");

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
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  console.log("HA FETCHH");

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

  const logout = async (e) => {
    console.log("HAMSA7777");
    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      });
      console.log(`bearer ${accessToken}`);

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const result = await response.json();
      console.log("RESULT BTA3 LOG OUT");
      console.log(result);
      console.log(result.message);
      if (result.message === "Logged out successfully") {
        localStorage.removeItem("token");
        router.push("/");
      } else {
        setLogoutError("Not logged out. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setLogoutError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {logoutError && ( // Display the alert if there is a logout error
        <div className="alert alert-danger" role="alert">
          {logoutError}
        </div>
      )}
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

          {role !== "Manager" && (
            <Link href="/reservations" passHref>
              <h1 className="link reservations">View Tickets</h1>
            </Link>
          )}

          <button onClick={logout} className="link logOut">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
