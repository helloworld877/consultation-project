import React, { useState, useEffect } from 'react';
import "../styles/managerAuthority.css";

export default function Admin() {
  const [existingManagers, setExistingManagers] = useState([]);
  const [managerRequests, setManagerRequests] = useState([]);

  useEffect(() => {
    console.log("ana d5alt ahw hgeb al arrays");
    const accessToken = localStorage.getItem("token");
    async function fetchManagerDetails() {
      try {
        const response = await fetch('http://localhost:8080/users/getSignUpRequests', {
          headers: {
            authorization: `bearer ${accessToken}`,
          }
        });
        console.log(`bearer ${accessToken}`);

        if (response.data) {
          setExistingManagers(response.data.managers);
          setManagerRequests(response.data.confirmedUsers);
          console.log(response.data.managers);
          console.log(response.data.confirmedUsers);
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
 
    console.log(existingManagers);
    console.log(managerRequests);

    fetchManagerDetails();
  }, []);

  return (
    <div className="container">
      <h1>Admin view</h1>
      <div className="listSection">
        <h2>Manager Details</h2>
        <ul className="managerList">
          {existingManagers.map(manager => (
            <li key={manager._id}>
              {manager.firstName} {manager.lastName}
              <button className="removeButton">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="requestSection">
        <h2>Join us & Become a Manager</h2>
        <ul className="managerList">
          {managerRequests.map(request => (
            <li key={request._id}>
              {request.firstName} {request.lastName}
              <button className="acceptButton">Accept</button>
              <button className="declineButton">Decline</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
