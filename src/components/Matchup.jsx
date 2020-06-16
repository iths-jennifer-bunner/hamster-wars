import React from 'react';


console.log('Sidan   matchup körs');


const Matchup = (props) => {
    const winner = props.winner;
    return(
    <div>
        <h3>Winner is:</h3>
        <p>{winner.name}</p>
    </div>
    
    )
}
export default Matchup;