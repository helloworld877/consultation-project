import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Added this import
import Link from "next/link";
import '../styles/editMatch.css'; 
import CustomInput from '../components/customInputField'; 
import CustomButton from '../components/customButton'; 

export default function EditMatch() { // Component names should be capitalized
    const router = useRouter();
    const { homeTeam, awayTeam, venue, dateTime, mainReferee, linesmen: linesmenQuery } = router.query;

    const [homeTeamState, setHomeTeamState] = useState('');
    const [awayTeamState, setAwayTeamState] = useState('');
    const [venueState, setVenueState] = useState('');
    const [dateTimeState, setDateTimeState] = useState('');
    const [mainRefereeState, setMainRefereeState] = useState('');
    const [linesmenState, setLinesmenState] = useState([]);

    useEffect(() => {
        if (router.isReady) {
            setHomeTeamState(homeTeam || '');
            setAwayTeamState(awayTeam || '');
            setVenueState(venue || '');
            setDateTimeState(dateTime || '');
            setMainRefereeState(mainReferee || '');
            setLinesmenState(linesmenQuery ? JSON.parse(linesmenQuery) : []);
        }
    }, [router.isReady, homeTeam, awayTeam, venue, dateTime, mainReferee, linesmenQuery]);

    return (
        <div className='Edit-Match'>
            <h1>Edit match</h1>

            <CustomInput
                type="text"
                name="homeTeam"
                placeholder="Home Team"
                id="homeTeam"
                value={homeTeamState} 
                onChange={(e) => setHomeTeamState(e.target.value)} 
            />

            <CustomInput
                type="text"
                name="awayTeam"
                placeholder="Away Team"
                id="awayTeam"
                value={awayTeamState} 
                onChange={(e) => setAwayTeamState(e.target.value)} 
            />

            <CustomInput
                type="text"
                name="venue"
                placeholder="Venue"
                id="venue"
                value={venueState} 
                onChange={(e) => setVenueState(e.target.value)} 
            />

            <CustomInput
                type="text"
                name="dateTime"
                placeholder="Date and Time"
                id="dateTime"
                value={dateTimeState} 
                onChange={(e) => setDateTimeState(e.target.value)} 
            />

            <CustomInput
                type="text"
                name="mainReferee"
                placeholder="Main Referee"
                id="mainReferee"
                value={mainRefereeState} 
                onChange={(e) => setMainRefereeState(e.target.value)} 
            />

            {linesmenState.map((linesman, index) => (
                <CustomInput
                    key={index}
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
            ))}
            
            <CustomButton onClick={() => {/* handle the save logic here */}}>
            Save
            </CustomButton>


        </div>
    );
}
