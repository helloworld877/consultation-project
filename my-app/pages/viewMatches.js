import React from 'react';
import MatchCard from '../components/matchCard';
import '../styles/viewMatches.css';



export default function Matches() {
   
    return (
        
        <div className="matches-page">
            <h1>Upcoming Matches</h1>
            <MatchCard showEditIcon={true}  />
        </div>
    );
}




// import React, { useEffect, useState } from 'react';

// export default function Matches() {
//     // const [matches, setMatches] = useState([]);

//     // useEffect(() => {
//         // Fetch the match details from your backend
//         // setMatches(response.data);
//     // }, []);

//     return (
//         <div>
//             <h1>Available Matches</h1>
//             <div className="cards-container">
//                 {matches.length > 0 ? (
//                     matches.map(match => <MatchCard key={match.id} match={match} />)
//                 ) : (
//                     <p>No matches available at this time.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// // MatchCard component
// function MatchCard({ match }) {
//     return (
//         <div className="match-card">
//             <h3>{match.homeTeam} vs {match.awayTeam}</h3>
//             <p>Venue: {match.venue}</p>
//             <p>Date & Time: {match.dateTime}</p>
//             <p>Main Referee: {match.mainReferee}</p>
//             <p>Linesmen: {match.linesmen.join(', ')}</p>
//         </div>
//     );
// }
