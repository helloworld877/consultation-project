import React from 'react';
import Link from 'next/link';
import styles from '../styles/matchCard.css';

const MatchCard = ({ clickable = true })=> {
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

    const matchPageDetailsUrl = `/matchSeats?homeTeam=${matchDetails.homeTeam}&awayTeam=${matchDetails.awayTeam}&venue=${matchDetails.venue}&dateTime=${matchDetails.dateTime}&mainReferee=${matchDetails.mainReferee}&linesmen=${encodeURIComponent(matchDetails.linesmen.join(', '))}`;
    
    return (
        <div className={`card ${clickable ? 'clickable' : 'unclickable'}`}>
            <a href={clickable ? matchPageDetailsUrl : undefined} className="match-link">
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
            </a>
        </div>
    );
};

export default MatchCard;
