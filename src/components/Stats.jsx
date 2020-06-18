import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Stats= () => {
    
    const [topHamsters, setTopHamsters] = useState([]);
    const [bottomHamsters, setBottomHamsters] = useState([]);
    const [totalGames, setTotalGames] = useState('');

    useEffect(() => {
        async function getTopHamsters() {
            let response = await fetch("/api/charts/top");
            const topFive = await response.json();            
            setTopHamsters(topFive.topHamsters);
        }
        getTopHamsters();

        async function getBottomHamsters() {
            let response = await fetch("/api/charts/bottom");
            const bottomFive = await response.json();
            setBottomHamsters(bottomFive.bottomHamsters);
            
        }
        getBottomHamsters();

        async function getTotalGames() {
            const response = await fetch("api/stats/total");
            const games = await response.json();
            setTotalGames(games);
        }
        getTotalGames();
    }, []);

    return(
        <div>
            <article>
                <h1>Top 5 hamsters!</h1>
                {topHamsters.map(hamster => (
                    <section key={hamster.id}>
                        <article>
                            <h3>{hamster.name}</h3>
                            <p>Wins: {hamster.wins}</p>
                        </article>
                        <StyledImg src={'./hamsters/' + hamster.imgName} alt='Fab hamster'></StyledImg>
                    </section>
                ))}
            </article>
            <article>
                <h1>Bottom 5 hamsters!</h1>
                {bottomHamsters.map(hamster => (
                    <section key={hamster.id}>
                        <article>
                            <h3>{hamster.name}</h3>
                            <p>Defeats: {hamster.defeats}</p>
                        </article>
                        <StyledImg src={'./hamsters/' + hamster.imgName} alt='Fab hamster'></StyledImg>
                    </section>
                ))}
            </article>
            <article >
                <h1>Total games:</h1>
                <h3>{totalGames.totalGames} games have been played!</h3>
            </article>
            <Link to='/battle'>
                    <StyledButton>Go to battle</StyledButton>
                </Link>
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
    color: white;
    font-size: 1em;
    margin-top: 1em;
    font-family: 'Raleway', sans-serif;
`
// const StyledImgGrid= styled.section`
// display: grid;
// grid-template-columns: 1fr 1fr;
// grid-gap: 2em;
// `


export default Stats;

// Visa statistik om matcher och tävlande hamstrar.

// totala antalet matcher
// top 5 hamstrar som vunnit mest
// top 5 hamstrar som förlorat mest