import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles/addMatch.css";
import CustomInput from "../components/customInputField";
import CustomDropdown from "../components/customDropDown";
import CustomButton from "../components/customButton";

export default function AddMatch() {
  const router = useRouter();
  const {
    homeTeam,
    awayTeam,
    venue,
    dateTime,
    mainReferee,
    linesmen: linesmenQuery,
  } = router.query;

  const [homeTeamState, setHomeTeamState] = useState("");
  const [awayTeamState, setAwayTeamState] = useState("");
  const [venueState, setVenueState] = useState("");
  const [dateState, setDateState] = useState("");
  const [timeState, setTimeState] = useState("");
  const [mainRefereeState, setMainRefereeState] = useState("");
  const [linesmenState, setLinesmenState] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [venueOptions, setVenueOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setHomeTeamState(homeTeam || "");
      setAwayTeamState(awayTeam || "");
      setVenueState(venue || "");
      const [date, time] = (dateTime || "").split(" ");
      setDateState(date);
      setTimeState(time);
      setMainRefereeState(mainReferee || "");
      setLinesmenState(
        linesmenQuery ? linesmenQuery.split(", ").slice(0, 2) : ["", ""]
      );
    }
  }, [
    router.isReady,
    homeTeam,
    awayTeam,
    venue,
    dateTime,
    mainReferee,
    linesmenQuery,
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/teams/getAllTeams")
      .then((response) => response.json())
      .then((data) => {
        const teamOptions = data.map((team) => ({
          label: team.name,
          value: team.name,
        }));
        setTeamOptions(teamOptions);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/stadiums/getAllStadiums")
      .then((response) => response.json())
      .then((data) => {
        data = data.stadiums;
        const venueOptions = data.map((stadium) => ({
          label: stadium.name,
          value: stadium.name,
        }));
        setVenueOptions(venueOptions);
      });
  }, []);

  const toInputDateValue = (date) => {
    const local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  const handleSave = () => {
    const selectedDate = new Date(dateState);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (
      !homeTeamState ||
      !awayTeamState ||
      !venueState ||
      !dateState ||
      !timeState ||
      !mainRefereeState ||
      !linesmenState[0] ||
      !linesmenState[1]
    ) {
      setError("All fields must be filled out.");
      return;
    } else if (selectedDate < currentDate) {
      setError("The date must be today or later.");
      return;
    }

    const matchData = {
      homeTeam: homeTeamState.value,
      awayTeam: awayTeamState.value,
      matchVenue: venueState.value,
      dateAndTime: `${dateState} ${timeState}`,
      mainReferee: mainRefereeState,
      linesMen: linesmenState.slice(0, 2),
    };

    fetch("http://localhost:8080/matches/createMatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "There is a conflict with an existing match.") {
          setError("There is a conflict with an existing match.");
        } else {
          console.log("Match added successfully:", data);
          setError(""); // Clear any previous errors
          router.push("/viewMatches");
        }
      })
      .catch((error) => {
        console.error("Error adding match:", error);
        setError("An error occurred while adding the match.");
      });
  };

  const awayTeamOptions = teamOptions.filter(
    (option) => option !== homeTeamState
  );
  const homeTeamOptions = teamOptions.filter(
    (option) => option !== awayTeamState
  );

  return (
    <div className="Add-Match">
      <h1>Add New Match</h1>
      {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <div className="columns-container">
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="homeTeam">Home Team:</label>
            </div>
            <CustomDropdown
              name="homeTeam"
              options={homeTeamOptions}
              placeholder="Select Home Team"
              id="homeTeam"
              onChange={(selectedOption) => setHomeTeamState(selectedOption)}
              value={homeTeamState}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="awayTeam">Away Team:</label>
            </div>
            <CustomDropdown
              name="awayTeam"
              options={awayTeamOptions}
              placeholder="Select Away Team"
              id="awayTeam"
              onChange={(selectedOption) => setAwayTeamState(selectedOption)}
              value={awayTeamState}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="venue">Venue:</label>
            </div>
            <CustomDropdown
              name="venue"
              options={venueOptions}
              placeholder="Select Venue"
              id="venue"
              onChange={(selectedOption) => setVenueState(selectedOption)}
              value={venueState}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="date">Date:</label>
            </div>
            <CustomInput
              type="date"
              name="date"
              placeholder="Date"
              id="date"
              value={dateState}
              onChange={(e) => setDateState(e.target.value)}
              min={toInputDateValue(new Date())} 
            />
          </div>
        </div>
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="time">Time:</label>
            </div>
            <CustomInput
              type="time"
              name="time"
              placeholder="Time"
              id="time"
              value={timeState}
              onChange={(e) => setTimeState(e.target.value)}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="mainreferee">Main Referee:</label>
            </div>
            <CustomInput
              type="text"
              name="mainReferee"
              placeholder="Main Referee"
              id="mainReferee"
              value={mainRefereeState}
              onChange={(e) => setMainRefereeState(e.target.value)}
            />
          </div>
          <div className="input-fields-label">
            <label htmlFor="linesMen">Linesmen:</label>
          </div>
          <div className="input-fields-container">
            {linesmenState.map((linesman, index) => (
              <div key={index}>
                <CustomInput
                  type="text"
                  name={`linesman-${index}`}
                  placeholder={`Linesman ${index + 1}`}
                  id={`linesman-${index}`}
                  value={linesman}
                  onChange={(e) => {
                    const newLinesmen = [...linesmenState];
                    newLinesmen[index] = e.target.value;
                    setLinesmenState(newLinesmen);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="custom-button-container">
        <CustomButton onClick={handleSave} style={{ color: "red" }}>
          Save
        </CustomButton>
      </div>
    </div>
  );
}
