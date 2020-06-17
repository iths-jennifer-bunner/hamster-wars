import React from 'react';


console.log('Sidan   matchup körs');
// this.props.location.state.winner;

// componentDidMount(props) {
//     console.log('winner',this.props.location.state.winner );
    
// }

const Matchup = (props) => {
    
    const winner = props.winner;
    
    return(
    <div>
        <h3>Winner is:</h3>
        <p key={ winner.id +winner.name}>{winner.name}</p>
    </div>
    
    )
}
export default Matchup;