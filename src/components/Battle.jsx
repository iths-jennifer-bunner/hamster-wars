import React, {useState} from 'react';

const Battle = () => {
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
    const handleClick1 = async () => {
        let hamster = await getHamsters();
        console.log('Got hamsters from api:', hamster1);
        setHamster1(hamster);
    }
    const handleClick2 = async () => {
        let hamster = await getHamsters();
        console.log('Got hamsters from api:', hamster1);
        setHamster2(hamster);
    }
    const [click1, setClick1] =useState(false)
    const [click2, setClick2] =useState(false)
    return(
        <div>
            <p>Click the image that has the most fab hamster</p>
            <button onClick={handleClick1}>Contestant 1</button>
            <button onClick={handleClick2}>Contestant</button>
            <div onClick={() => setClick1(true)}>{click1=== true ? 'I am the winner' : ''}
                { hamster1 ? <div >Contestant 1: is {hamster1.name}, {hamster1.age} years young, and likes {hamster1.loves} and eats {hamster1.favFood}.</div> : null }
            </div>
            <div onClick={() => setClick2(true)}>{click2=== true ? 'I am the winner' : ''}
                { hamster2 ? <div >Contestant 1: is {hamster2.name}, {hamster2.age} years young, and likes {hamster2.loves} and eats {hamster2.favFood}.</div> : null }
            </div>
        </div>
    )
}

async function getHamsters() {
    let baseUrl = '/api';
    try {
        const response = await fetch(baseUrl + '/hamsters/random');
        const hamster = await response.json();
        console.log('response',response); 
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