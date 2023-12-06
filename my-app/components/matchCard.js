import React from 'react';
import styles from '../styles/matchCard.css';

const MatchCard = () => {
  
    const matchDetails = {
        homeTeam: 'Al Ahly',
        awayTeam: 'Zamalek',
        venue: 'Cairo International Stadium',
        dateTime: '2023-12-31 20:00',
        mainReferee: 'Gehad Grisha',
        linesmen: ['Mahmoud Abouelregal', 'Tahssen Bedyer']
    };

   
    const homeTeamImageUrl = '/images/ahly.png'; 
    const awayTeamImageUrl = '/images/Zamalek.png'; 
    
    return (
        <div className="card">
            <div className="logos-container">
                <img src={homeTeamImageUrl} alt={`${matchDetails.homeTeam} Logo`} className="team-logo" />
                <div className="vs">VS</div>
                <img src={awayTeamImageUrl} alt={`${matchDetails.awayTeam} Logo`} className="team-logo" />
            </div>
            <h3>{matchDetails.homeTeam} vs {matchDetails.awayTeam}</h3>
            <p><strong>Venue:</strong> {matchDetails.venue}</p>
            <p><strong>Date & Time:</strong> {matchDetails.dateTime}</p>
            <p><strong>Main Referee:</strong> {matchDetails.mainReferee}</p>
            <p><strong>Linesmen:</strong> {matchDetails.linesmen.join(', ')}</p>
        </div>
    );
};

export default MatchCard;
