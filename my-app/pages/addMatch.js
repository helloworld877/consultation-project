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

  const handleSave = () => {
    // Implement your save logic here
    console.log("Saving match details:", {
      homeTeam: homeTeamState,
      awayTeam: awayTeamState,
      venue: venueState,
      dateTime: `${dateState} ${timeState}`,
      mainReferee: mainRefereeState,
      linesmen: linesmenState,
    });
    // Perform other actions like sending a request to an API endpoint

    // After saving, you might want to navigate the user away or give a success message
    // router.push('/some-success-page');
  };
  const teamOptions = [
    { label: "Al Ahly", value: "Al Ahly" },
    { label: "Zamalek", value: "Zamalek" },
    { label: "Ismaily", value: "Ismaily" },
  ];
  const awayTeamOptions = teamOptions.filter(option => option.value !== homeTeamState.value);
  const homeTeamOptions = teamOptions.filter(option => option.value !== awayTeamState.value);

  return (
    <div className="Add-Match">
      <h1>Add New Match</h1>
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
            <CustomInput
              type="text"
              name="venue"
              placeholder="Venue"
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
        <CustomButton onClick={handleSave}>Save</CustomButton>
      </div>
    </div>
  );
}
