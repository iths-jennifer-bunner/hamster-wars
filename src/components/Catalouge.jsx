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
            {/* <section>
                <h3>Here are all our fab hamsters</h3>
                <p>Check in all our fab hamsters!</p>
            </section> */}
            <StyledGrid>
                    { hamsters
                        ? hamsters.map(hamster => (
                            <div key={hamster.id}>
                                <article>
                                {hamster.name} gillar {hamster.loves} och äter helst {hamster.favFood}!
                                </article>
                                <StyledImg src={'/hamsters/' + hamster.imgName} alt='hamster'></StyledImg>
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
// async function getHamsters(){
//     let baseUrl = '/api';
//     try {
//         const response = await fetch(baseUrl + '/hamsters');
//         const hamsterArray = await response.json();
//         return hamsterArray;
//     } catch (e) {
//         console.log('Fetch failed because', e);
//         return null;
//     }
// }
export default Catalouge;