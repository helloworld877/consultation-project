import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles/editMatch.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function EditMatch() {
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

  useEffect(() => {
    if (router.isReady) {
      setHomeTeamState(homeTeam || "");
      setAwayTeamState(awayTeam || "");
      setVenueState(venue || "");
      const [date, time] = (dateTime || "").split(" ");
      setDateState(date);
      setTimeState(time);
      setMainRefereeState(mainReferee || "");
      // Split the linesmen string into an array
      setLinesmenState(linesmenQuery ? linesmenQuery.split(", ") : []);
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

  const handleSave = () => {
    // Implement your save logic here
    // This could involve sending a request to an API endpoint
    console.log("Saving match details:", {
      homeTeam: homeTeamState,
      awayTeam: awayTeamState,
      venue: venueState,
      dateTime: dateTimeState,
      mainReferee: mainRefereeState,
      linesmen: linesmenState,
    });

    // After saving, you might want to navigate the user away or give a success message
    // router.push('/some-success-page');
  };

  return (
    <div className="Edit-Match">
      <h1>Edit match</h1>
      <div className="columns-container">
        <div className="column">
          <div className="input-fields-container">
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
            <CustomInput
              type="text"
              name="mainReferee"
              placeholder={mainRefereeState}
              id="mainReferee"
              value={mainRefereeState}
              onChange={(e) => setMainRefereeState(e.target.value)}
            />
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
