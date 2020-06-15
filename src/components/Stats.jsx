import React, {useState, useEffect} from 'react';

const Stats= () => {
    
    const [topHamsters, setTopHamsters] = useState([]);
    const [bottomHamsters, setBottomHamsters] = useState([]);

    useEffect(() => {
        async function getTopHamsters() {
            const response = await fetch("api/charts/top");
            const topFive = await response.json();
            setTopHamsters(topFive.topHamsters);
        }
        getTopHamsters();

        async function getBottomHamsters() {
            const response = await fetch("api/charts/bottom");
            const bottomFive = await response.json();
            setBottomHamsters(bottomFive.bottomHamsters);
        }
        getBottomHamsters();
    }, []);

    return(
        <div>
            <article>
                <h1>Top 5 hamsters!</h1>
                {topHamsters.map(hamster => (
                    <section>
                        <h5>{hamster.name}</h5>
                        <p>Wins: {hamster.wins}</p>
                        <img src={'./hamsters/' + hamster.imgName} alt='hamster'></img>
                    </section>
                ))}
            </article>
            <article>
                <h1>Bottom 5 hamsters!</h1>
                {bottomHamsters.map(hamster => (
                    <section>
                        <h5>{hamster.name}</h5>
                        <p>Defeats: {hamster.defeats}</p>
                        <img src={'./hamsters/' + hamster.imgName} alt='hamster'></img>
                    </section>
                ))}
            </article>
        </div>
    )
}

export default Stats;

// Visa statistik om matcher och tävlande hamstrar.

// totala antalet matcher
// top 5 hamstrar som vunnit mest
// top 5 hamstrar som förlorat mest