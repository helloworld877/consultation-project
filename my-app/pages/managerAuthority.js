import React, { useState, useEffect } from "react";
import "../styles/managerAuthority.css";

export default function Admin() {
  const [existingManagers, setExistingManagers] = useState([]);
  const [managerRequests, setManagerRequests] = useState([]);

  useEffect(() => {
    console.log("Fetching manager arrays...");

    const accessToken = localStorage.getItem("token");

    async function fetchManagerDetails() {
      try {
        const response = await fetch(
          "http://localhost:8080/users/getSignUpRequests",
          {
            headers: {
              authorization: `bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched:", data);

        setExistingManagers(data.managers || []);
        setManagerRequests(data.nonConfirmedUsers || []);

        console.log(data.managers);
        console.log(data.confirmedUsers);
      } catch (error) {
        console.error(
          "There was an error fetching the manager details!",
          error
        );
      }
    }

    fetchManagerDetails();
  }, []);

  return (
    <div className="container">
      <div className="managerSection">
        <h2>Existing Managers</h2>
        {existingManagers.map((manager) => (
          <div key={manager._id} className="managerEntry">
            <span className="name">
              {manager.firstName} {manager.lastName}
            </span>

            <button className="removeButton">Remove</button>
          </div>
        ))}
      </div>
      <div className="requestSection">
        <h2>Manager Requests</h2>
        {managerRequests.map((request) => (
          <div key={request._id} className="requestEntry">
            {" "}
            <span className="name">
              {request.firstName} {request.lastName}
            </span>
            <button className="acceptButton">Accept</button>
            <button className="declineButton">Decline</button>
          </div>
        ))}
      </div>
    </div>
  );
}
