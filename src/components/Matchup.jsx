import React from 'react';
import {useState, useEffect } from 'react';
import { withRouter} from "react-router-dom";
import styled from 'styled-components';

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
            async function getHamsterById() {                
                let response = await fetch(`/api/hamsters/${match.params.winner}`);                
                const winner = await response.json();                
                response = await fetch(`/api/hamsters/${match.params.looser}`);
                const looser = await response.json();
                setWinner(winner);
                setLooser(looser);
            }
            getHamsterById();
        }
    }, [match])
    console.log(looser);
    
    return(
    <div> {winner ? (
        <div>
            <h3>Winner is:</h3>
            <p key={ winner.id +winner.name}>{winner.name} and he or she is {winner.age} and loves {winner.loves}</p>
            <StyledImg src={'/hamsters/' + winner.imgName} alt='hamster'></StyledImg><br />
            <button>New Game</button>
        </div>
    ) : <h3>Loading...</h3>}        
    </div>
    )
}

const StyledImg= styled.img`
    width: 15em;
    cursor: pointer;
    transition: transform 0.7s ease-out;
`
// export default Matchup;
export default withRouter(Matchup);