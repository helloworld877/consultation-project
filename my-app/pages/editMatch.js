import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/editMatch.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function EditMatch() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    id,
    homeTeam,
    awayTeam,
    venue,
    dateTime,
    mainReferee,
    linesmen: linesmenQuery,
  } = router.query;

  const [matchId, setMatchId] = useState("");
  const [homeTeamState, setHomeTeamState] = useState("");
  const [awayTeamState, setAwayTeamState] = useState("");
  const [venueState, setVenueState] = useState("");
  const [dateState, setDateState] = useState("");
  const [timeState, setTimeState] = useState("");
  const [mainRefereeState, setMainRefereeState] = useState("");
  const [linesmenState, setLinesmenState] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      setMatchId(id || "");
      setHomeTeamState(homeTeam || "");
      setAwayTeamState(awayTeam || "");
      setVenueState(venue || "");
      const [date, time] = (dateTime || "").split(" ");
      setDateState(date);
      setTimeState(time);
      setMainRefereeState(mainReferee || "");
      setLinesmenState(linesmenQuery ? linesmenQuery.split(", ") : []);
    }
  }, [
    router.isReady,
    id,
    homeTeam,
    awayTeam,
    venue,
    dateTime,
    mainReferee,
    linesmenQuery,
  ]);

  const handleSave =async (e) => {
    e.preventDefault();
    if (
      !homeTeamState ||
      !awayTeamState ||
      !venueState ||
      !dateState ||
      !timeState ||
      !mainRefereeState ||
      linesmenState.includes("")
    ) {
      setErrorMessage("Please complete all fields.");
    } else {
      setErrorMessage("");

      const matchDetails = {
        id: matchId,
        homeTeam: homeTeamState,
        awayTeam: awayTeamState,
        matchVenue: venueState,
        dateAndTime: `${dateState} ${timeState}`,
        mainReferee: mainRefereeState,
        linesMen: linesmenState,
      };
      try {
        const response = await fetch("http://localhost:8080/matches/updateMatch", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchDetails),
        });
        const result = await response.json();
        console.log(result);
        if (result.message === "Edited Match Successfully") {
          router.push("/viewMatches");
        } else {
          setErrorMessage(result.message || "Failed to edit match");
        }
      } catch (error){
        console.error("Failed to update password:", error);
        setErrorMessage(error.message || "Failed to edit match");
      }
    }
  };

  return (
    <div className="Edit-Match">
      <h1>Edit match</h1>
      {errorMessage && (
        <p
          className="error-message"
          style={{ color: "red", textAlign: "center" }}
        >
          {errorMessage}
        </p>
      )}
      <div className="columns-container">
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
          <label htmlFor="homeTeam">Home Team:</label>
          </div>
            <CustomInput
              type="text"
              name="homeTeam"
              placeholder={homeTeamState}
              id="homeTeam"
              value={homeTeamState}
              onChange={(e) => setHomeTeamState(e.target.value)}
            />
          </div>
          <div className="input-fields-container">
          <div className="input-fields-label">
          <label htmlFor="awayTeam">Away Team:</label>
          </div>
            <CustomInput
              type="text"
              name="awayTeam"
              placeholder={awayTeamState}
              id="awayTeam"
              value={awayTeamState}
              onChange={(e) => setAwayTeamState(e.target.value)}
            />
          </div>
          <div className="input-fields-container">
          <div className="input-fields-label">
          <label htmlFor="venue">Venue:</label>
          </div>
            <CustomInput
              type="text"
              name="venue"
              placeholder={venueState}
              id="venue"
              value={venueState}
              onChange={(e) => setVenueState(e.target.value)}
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
          <label htmlFor="mainReferee">Main Referee:</label>
          </div>
            <CustomInput
              type="text"
              name="mainReferee"
              placeholder={mainRefereeState}
              id="mainReferee"
              value={mainRefereeState}
              onChange={(e) => setMainRefereeState(e.target.value)}
            />
          </div>

          <div className="input-fields-label">
          <label htmlFor="linesMen">Linesmen:</label>
          </div>
          {linesmenState.map((linesman, index) => (
            <div className="input-fields-container">
              <CustomInput
                key={index}
                type="text"
                name={`linesman-${index}`}
                placeholder={linesman}
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
      <div className="custom-button-container">
        <CustomButton onClick={handleSave}>Save</CustomButton>
      </div>
    </div>
  );
}
