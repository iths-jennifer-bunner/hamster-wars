import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Catalouge = () => {
    let [hamsters, setHamsters]= useState(null)

    useEffect(() => {
        async function getHamsters() {
            let response = await fetch("/api/hamsters");
            const hamsters = await response.json();            
            setHamsters(hamsters.hamsters);
        }
        getHamsters()
    }, [])

    return(
        
        <article>
            <StyledGrid>
                    { hamsters
                        ? hamsters.map(hamster => (
                            <div key={hamster.id}>
                                <article>
                                {hamster.name} loves {hamster.loves} and prefers to eat {hamster.favFood}!
                                </article>
                                <StyledImg src={'./hamsters/' + hamster.imgName} alt=' Fab hamster'></StyledImg>
                            </div>
                        ))
                        : null }
                        
                </StyledGrid>
        </article>
    )
}
const StyledImg= styled.img`
    width: 10em;
    border-radius: 5px;
`
const StyledGrid= styled.section`
    font-family: 'Raleway', sans-serif;

        @media (min-width: 600px){
        display: grid;
        grid-gap: 1.5em;
        grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 760px){
        display: grid;
        grid-gap: 1.5em;
        grid-template-columns: 1fr 1fr 1fr;
        }
        @media (min-width: 1120px){
        display: grid;
        grid-gap: 1.5em;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        }
`

export default Catalouge;