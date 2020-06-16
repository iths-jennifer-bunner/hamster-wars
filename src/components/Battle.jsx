import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Matchup from './Matchup';

console.log('sidan battle körs');


const Battle = () => {
    console.log('funktion battle körs');
    
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
    // const [click1, setClick1] =useState(false)
    // const [click2, setClick2] =useState(false)
    const [newGame, setNewGame] =useState(false)
    const [winner, setWinner] =useState(null)

    // useEffect(() => { 
    //     async function handleClick1() {
    //             let hamster = await getHamsters();
    //             setHamster1(hamster);                
    //         }
    //         handleClick1()            
    // }, [])

    // useEffect(() => { 
    //     async function handleClick2() {
    //             let hamster = await getHamsters();
    //             setHamster2(hamster);                
    //         }
    //         handleClick2()            
    // }, [])
    useEffect(() => {
console.log('useeffekt körs');

        async function getRandomHamster() {
            let response = await fetch("/api/hamsters/random");
            const randomHamster1 = await response.json();
            console.log('getRandomhamster körs');
            

            response = await fetch("/api/hamsters/random");
            const randomHamster2 = await response.json();

            //Kanske fungerar
            if(randomHamster1.id === randomHamster2.id) {
                console.log("FOUND SAME!")
                newGame ? setNewGame(false) : setNewGame(true);

            }else {
                setHamster1(randomHamster1)
                setHamster2(randomHamster2);
            }
        }

        getRandomHamster();
console.log('körs use effekt?');

    }, [newGame])
    function handleClick(winner, looser) {
        console.log('handleclick körs');
        
        console.log(winner.id);
        console.log(looser.id);
        setWinner(winner);
        newGame ? setNewGame(false) : setNewGame(true);
        updateWinner(winner.id);
        updateLooser(looser.id);
        updateGames(winner.id, looser.id);
    }
    return(
        <div>
            <p>Click the image that has the most fab hamster</p>
            <article>
                        <img src={"./hamsters/" + hamster1.imgName} alt="Cute hamster"
                            onClick={() => handleClick(hamster1, hamster2)}/>
                    <p>{hamster1.name}</p>
                </article>
                <article>
                        <img src={"./hamsters/" + hamster2.imgName} alt="Cute hamster"
                            onClick={() => handleClick(hamster2, hamster1)}/>
                    <p>{hamster2.name}</p>
                </article>
            {/* { hamster1 ? <div > <StyledImg src={"./hamsters/" + hamster1.imgName} alt="A hamster"  onClick={() => setClick1(true)}/>
            Contestant 1: is {hamster1.name}, {hamster1.age} years young, and likes {hamster1.loves} and eats {hamster1.favFood}.</div> : null }

            { hamster2 ? <div > <StyledImg src={"./hamsters/" + hamster2.imgName} alt="A hamster" onClick={() => setClick2(true)}/>
            Contestant 2: is {hamster2.name}, {hamster2.age} years young, and likes {hamster2.loves} and eats {hamster2.favFood}.</div> : null } */}

            <DeclareWinner>
            {winner !== null ? <Matchup winner={winner} />: null}
                {/* {click1=== true ? hamster1.name+ " is the winner!!!" : ''}
                {click2=== true ? hamster2.name+' is the winner!!!' : ''} */}
            </DeclareWinner>
        </div>
    )
}

// const StyledImg= styled.img`
//     width: 15em;
//     cursor: pointer;
// `
const DeclareWinner= styled.div`
    font-size: large;
    color: hotpink;
`
function updateWinner(id) {
    console.log('update winner körs');
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"wins":1,"defeats":0});

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`/api/hamsters/${id}/results`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    }

    function updateLooser(id) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({"wins":0,"defeats":1});
    
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`/api/hamsters/${id}/results`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    function updateGames(winner, looser) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"contestants":{"id1": winner,"id2": looser}, "winner":{"id": winner}});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("/api/games", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

// async function getHamsters() {
//     let baseUrl = '/api';
//     try {
//         const response = await fetch(baseUrl + '/hamsters/random');
//         const hamster = await response.json(); 
//         return hamster;
//     } catch (e) {
//         console.log('Fetch failed because', e);
//         return null;
//     }
// }



export default Battle;

// Två hamstrar ställs mot varandra. Bara en kan vinna. Om det finns parametrar i URL ska de användas, annars två slumpade hamstrar (se routes ovan). Användaren röstar genom att klicka på den bild man tycker bäst om. När man röstat ska resultatet visas.


//RESULT 
// Visa resultatet av en match mellan två hamstrar. Man vill se så mycket information som möjligt om vinnaren - åtminstone bild och namn.