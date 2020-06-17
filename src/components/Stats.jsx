//Css:a....
import React, {useState, useEffect} from 'react';

const Stats= () => {
    
    const [topHamsters, setTopHamsters] = useState([]);
    const [bottomHamsters, setBottomHamsters] = useState([]);
    const [totalGames, setTotalGames] = useState('');

    useEffect(() => {
        async function getTopHamsters() {
            const response = await fetch("/api/charts/top");
            const topFive = await response.json();            
            setTopHamsters(topFive);
            console.log('top:', topFive);
            console.log(setTopHamsters);
        }
        getTopHamsters();

        async function getBottomHamsters() {
            const response = await fetch("/api/charts/bottom");
            const bottomFive = await response.json();
            setBottomHamsters(bottomFive);
            console.log('bottom' ,bottomFive);
            console.log(setBottomHamsters);
            
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
                            <h5>{hamster.name}</h5>
                            <p>Wins: {hamster.wins}</p>
                        </article>
                        {/* <img src={'./hamsters/' + hamster.imgName} alt='hamster'></img> */}
                    </section>
                ))}
            </article>
            <article>
                <h1>Bottom 5 hamsters!</h1>
                {bottomHamsters.map(hamster => (
                    <section key={hamster.id}>
                        <article>
                            <h5>{hamster.name}</h5>
                            <p>Defeats: {hamster.defeats}</p>
                        </article>
                        {/* <img src={'./hamsters/' + hamster.imgName} alt='hamster'></img> */}
                    </section>
                ))}
            </article>
            <article >
                <p>Total games</p>
                <h2>{totalGames.totalGames}</h2>
            </article>
        </div>
    )
}

export default Stats;

// Visa statistik om matcher och tävlande hamstrar.

// totala antalet matcher
// top 5 hamstrar som vunnit mest
// top 5 hamstrar som förlorat mest