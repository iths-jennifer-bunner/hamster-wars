import React from 'react';
import {useState, useEffect } from 'react';
import { withRouter} from "react-router-dom";

console.log('Sidan   matchup körs');
// this.props.location.state.winner;

// componentDidMount(props) {
//     console.log('winner',this.props.location.state.winner );
    
// }

const Matchup = ({match}) => {
    
    const [winner, setWinner] = useState(null);
    const [looser, setLooser] = useState(null);

    useEffect(() => {
        if (match) {
            console.log("AAAAA");
            async function getHamsterById() {
                console.log('getHamsterbyid körs');                
                let response = await fetch(`/api/hamsters/${match.params.winner}`);                
                const winner = await response.json();                
                response = await fetch(`/api/hamsters/${match.params.looser}`);
                const looser = await response.json();
                setWinner(winner);
                setLooser(looser);
            }
            getHamsterById();
        }
    }, [])
    // const winner = props.winner;
    console.log('vinnaren är  ' +winner);
    
    return(
    <div> {winner ? (
        <div>
        <h3>Winner is:</h3>
        <p key={ winner.id +winner.name}>{winner.name}</p></div>
    ) : <h3>Loading...</h3>}
        
    </div>
    
    )
}
// export default Matchup;
export default withRouter(Matchup);