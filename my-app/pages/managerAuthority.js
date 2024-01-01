import React from 'react';
import "../styles/managerAuthority.css";

export async function getStaticProps() {
 
  const existingManagers = ['Marly Mofeed'];
  const managerRequests = ['Sarraa', 'Mark Milad', 'Ziad'];

  return {
    props: {
      existingManagers,
      managerRequests,
    },
    revalidate: 10,
  };
}

export default function Admin({ existingManagers, managerRequests }) {
  
  return (
    <div className="container">
      <h1>Admin view</h1>
      <div className="listSection">
        <h2>Manager Details</h2>
        <ul className="managerList">
          {existingManagers.map((manager) => (
            <li key={manager}>
              {manager}
              <button className="removeButton">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="requestSection">
        <h2>Join us & Become a Manager</h2>
        <ul className="managerList">
          {managerRequests.map((request) => (
            <li key={request}>
              <div><span>{request}</span></div>
              <button className="acceptButton">Accept</button>
              <button className="declineButton">Decline</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
