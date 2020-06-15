import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

console.log('sidan battle körs');


const Battle = () => {
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
    const [click1, setClick1] =useState(false)
    const [click2, setClick2] =useState(false)
    // const [newGame, setNewGame] =useState(false)

    useEffect(() => { 
        async function handleClick1() {
                let hamster = await getHamsters();
                setHamster1(hamster);
                console.log('setHamster1:',setHamster1);
                
            }
            handleClick1()
            console.log('handle click 1 körs');
            
    }, [])

    useEffect(() => { 
        async function handleClick2() {
                let hamster = await getHamsters();
                setHamster2(hamster);
                
            }
            handleClick2()
            
    }, [])
    
    return(
        <div>
            <p>Click the image that has the most fab hamster</p>
            
            { hamster1 ? <div > <StyledImg src={"./hamsters/" + hamster1.imgName} alt="A hamster"  onClick={() => setClick1(true)}/>
            Contestant 1: is {hamster1.name}, {hamster1.age} years young, and likes {hamster1.loves} and eats {hamster1.favFood}.</div> : null }

            { hamster2 ? <div > <StyledImg src={"./hamsters/" + hamster2.imgName} alt="A hamster" onClick={() => setClick2(true)}/>
            Contestant 2: is {hamster2.name}, {hamster2.age} years young, and likes {hamster2.loves} and eats {hamster2.favFood}.</div> : null }

            <DeclareWinner>
                {click1=== true ? hamster1.name+ " is the winner!!!" : ''}
                {click2=== true ? hamster2.name+' is the winner!!!' : ''}
            </DeclareWinner>
        </div>
    )
}

const StyledImg= styled.img`
    width: 15em;
    cursor: pointer;
`
const DeclareWinner= styled.div`
    font-size: large;
    color: hotpink;
`

async function getHamsters() {
    let baseUrl = '/api';
    try {
        const response = await fetch(baseUrl + '/hamsters/random');
        const hamster = await response.json(); 
        return hamster;
    } catch (e) {
        console.log('Fetch failed because', e);
        return null;
    }
}



export default Battle;

// Två hamstrar ställs mot varandra. Bara en kan vinna. Om det finns parametrar i URL ska de användas, annars två slumpade hamstrar (se routes ovan). Användaren röstar genom att klicka på den bild man tycker bäst om. När man röstat ska resultatet visas.


//RESULT 
// Visa resultatet av en match mellan två hamstrar. Man vill se så mycket information som möjligt om vinnaren - åtminstone bild och namn.