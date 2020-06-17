import React from 'react';
import {useState, useEffect } from 'react';
import { withRouter, useHistory} from "react-router-dom";
import styled from 'styled-components';
import Battle from './Battle';


const Matchup = ({match}) => {
    let history = useHistory();
    const [winner, setWinner] = useState(null);
    const [looser, setLooser] = useState(null);
    const [click, setClick] = useState(false)

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

    function handleClick(){
        setClick(true)
        history.push({
        pathname: `/battle/`,
        state: { winner: winner, looser: looser },
        })
    }
    
    return(
    <div> {winner ? (
        <div>
            <h3>Winner is:</h3>
            <p key={ winner.id +winner.name}>{winner.name} and he or she is {winner.age} and loves {winner.loves}</p>
            <StyledImg src={'/hamsters/' + winner.imgName} alt='hamster'></StyledImg><br />
            <StyledButton onClick={() => handleClick()}
            >New Game</StyledButton>
            {click === true ? <Battle /> : false}
        </div>
    ) : <h1>Loading...</h1>}        
    </div>
    )
}

const StyledImg= styled.img`
    width: 15em;
    cursor: pointer;
    transition: transform 0.7s ease-out;
    border-radius: 5px;
`
const StyledButton= styled.button`
    padding: 0.3em 1.5em;
    border: none;
    border-radius: 5px;
    background-color: #17736A;
    color: black;
    font-size: 1em;
    margin-top: 1em;
    font-family: 'Raleway', sans-serif;
`
export default withRouter(Matchup);