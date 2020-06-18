import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Start= () => (
    <div>
        <h3>Welcome to the fab hamster wars</h3>
        <p>Here can you vote on fab hamsters and upload your own fab hamster to battle.</p>
        <Link to='/battle'>
            <StyledButton>Yes Im ready to Battle!</StyledButton>
        </Link>
    </div>
)

const StyledButton= styled.button`
    padding: 0.3em 1.5em;
    border: none;
    border-radius: 5px;
    background-color: #17736A;
    color: white;
    font-size: 1em;
    margin-top: 1em;
    font-family: 'Raleway', sans-serif;
`
export default Start;

// Här ska du presentera idén med appen. Startsidan ska vara det första man ser när man laddar appen. Därifrån kan man gå till battle, statistik eller uppladdning.

// Tips: använd navigeringslänkar i <header>.