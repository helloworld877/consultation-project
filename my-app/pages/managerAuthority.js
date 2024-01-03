import React, { useState, useEffect } from "react";
import "../styles/managerAuthority.css";
import Alert from "react-bootstrap/Alert";
import Link from "next/link";


export default function Admin() {
  const [existingUsers, setExistingManagers] = useState([]);
  const [userRequests, setManagerRequests] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

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

  const handleUserAction = async (user, actionType) => {
    const userName = `${user.userName}`;
    const actionObject = { userName, message: actionType };

    try {
      const response = await fetch(
        "http://localhost:8080/users/handleRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(actionObject),
        }
      );
      //console.log(JSON.stringify(actionObject));
      console.log(response);
      console.log(JSON.stringify(actionObject));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("DATAAAA MN ZOZ AHEH ");
      console.log("Server response:", data);
      if (
        data.message === "SignUp Request Accepted Successfully" ||
        data.message === "SignUp Request Declined Successfully" ||
        data.message === "Manager Account Removed Successfully"
      ) {
        setExistingManagers(existingUsers.filter((u) => u._id !== user._id));
        setManagerRequests(userRequests.filter((u) => u._id !== user._id));
      } else {
        console.log("Action was not completed successfully:", data.message);
      }
    } catch (error) {
      console.error("There was an error sending the user action!", error);
      setAlertContent("Failed to send the request");
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Link href="/">
          <img
            src="/home.png"
            alt="Home"
            className="Loginicon photo"
            title="Home"
          />
        </Link>
    
    <div className="container">
      <h1>Requests</h1>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading className="alert">
            Oh snap! You got an error!
          </Alert.Heading>
          <p>{alertContent}</p>
        </Alert>
      )}
      <div className="managerSection">
       
        <h2>Existing Users</h2>
        {existingUsers.map((manager) => (
          <div key={manager._id} className="managerEntry">
            <span className="userInfo">
              {" "}
              {/* Wrapper for user info */}
              <span className="name">
                {manager.firstName} {manager.lastName}
              </span>
              <span className="role">({manager.role})</span>
            </span>{" "}
            {/* End of user info */}
            <button
              className="removeButton"
              onClick={() => handleUserAction(manager, "remove")}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="requestSection">
        <h2>User Requests</h2>
        {userRequests.map((request) => (
          <div key={request._id} className="requestEntry">
            {" "}
            <span className="userInfo">
              {" "}
              {/* Wrapper for user info */}
              <span className="name">
                {request.firstName} {request.lastName}
              </span>
              <span className="role">({request.role})</span>
            </span>{" "}
            {/* End of user info */}
            <div className="ContainerButtons">
              <button
                className="acceptButton"
                onClick={() => handleUserAction(request, "accept")}
              >
                Accept
              </button>
              <button
                className="declineButton"
                onClick={() => handleUserAction(request, "decline")}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
