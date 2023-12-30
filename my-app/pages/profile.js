import React from "react";
import Link from "next/link";
import "../styles/profile.css";

export default function Profile() {
  const userName = "Ziad Abd El Wareth";
  const userAge = "22";
  const userProfileImage = "/images/football.jpg";

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info">
        <div className="user-details">
          <img src={userProfileImage} alt="Profile" className="profile-image" />
          <div className="name-age">
            <div className="name">{userName}</div>
            <div className="age">{userAge} years</div>
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
        </div>
      </div>
    </div>
  );
}
