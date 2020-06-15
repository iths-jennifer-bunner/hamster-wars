import React from "react";
// import Battle from './Battle';
import styled from 'styled-components';

const Result = (props) =>{
    const winner = props.winner;
    return(
        <div>
            <h1>The winner is:</h1>
            <p>{winner.name}</p>
            <StyledImg src={"./hamsters/" + winner.imgName} alt="A hamster" />
        </div>
    )
}

const StyledImg= styled.img`
    width: 15em;
`
export default Result;