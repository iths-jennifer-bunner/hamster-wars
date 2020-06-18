import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useHistory, withRouter} from "react-router-dom";
import Matchup from './Matchup';

const Battle = ({match}) => {

    let history = useHistory();
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
    const [newGame, setNewGame] =useState(false);
    const [winner, setWinner] =useState(null);

    useEffect(() => {

        if(match.params.id1 && match.params.id2){

            async function getHamsterById() {              
                let response = await fetch(`/api/hamsters/${match.params.id1}`);                
                const hamster1 = await response.json();                
                response = await fetch(`/api/hamsters/${match.params.id2}`);
                const hamster2 = await response.json();
                setHamster1(hamster1);
                setHamster2(hamster2);
            }
                getHamsterById();
        }else{

            async function getRandomHamster() {
                let response = await fetch("/api/hamsters/random");
                const randomHamster1 = await response.json();

                response = await fetch("/api/hamsters/random");
                const randomHamster2 = await response.json();

                if(randomHamster1.id === randomHamster2.id) {
                    newGame ? setNewGame(false) : setNewGame(true);
                }else {
                    setHamster1(randomHamster1)
                    setHamster2(randomHamster2);
                }
            }
            getRandomHamster();
        }
    }, [newGame])

    function handleClick(winner, looser) {        
        console.log(winner.id);
        console.log(looser.id);
        setWinner(winner);
        newGame ? setNewGame(false) : setNewGame(true);
        updateWinner(winner.id);
        updateLooser(looser.id);
        updateGames(winner.id, looser.id);
        history.push({
            pathname: `/matchup/${winner.id}/${looser.id}/`,
            state: { winner: winner, looser: looser },
        })
    }

    return(
        <div>{hamster1 && hamster2 ? (
            <div>
                <h3>Click the image that has the most fab hamster</h3>
                <article>
                        <StyledImg src={"/hamsters/" + hamster1.imgName} alt="Fab hamster"
                            onClick={() => handleClick(hamster1, hamster2)} 
                            />
                            <p>{hamster1.name} is {hamster1.age} years and loves to {hamster1.loves} and prefers to eat {hamster1.favFood}</p>
                </article>
                <article>
                        <StyledImg src={"/hamsters/" + hamster2.imgName} alt="Fab hamster"
                            onClick={() => handleClick(hamster2, hamster1)}
                        />
                        <p>{hamster2.name} is {hamster2.age} years and loves to {hamster2.loves} and prefers to eat {hamster2.favFood}</p>
                </article>

                <div>
                    {winner !== null ? <Matchup winner={winner}/> : null}
                </div>
            </div>
            ) :
            <h1>Loading...</h1>}
        </div>
    )
}


function updateWinner(id) {
    console.log('id är' ,id);
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"wins":1,"defeats":0});

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`/api/hamsters/${id}/result`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    }

    function updateLooser(id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        let raw = JSON.stringify({"wins":0,"defeats":1});
    
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`/api/hamsters/${id}/result`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    function updateGames(winner, looser) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"contestants":{"id1": winner,"id2": looser}, "winner":{"id": winner}});

        let requestOptions = {
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


const StyledImg= styled.img`
    width: 15em;
    cursor: pointer;
    transition: transform 0.7s ease-out;
    border-radius: 5px;

    :hover{
        transform: translateY(-0.3em) rotateZ(1deg);
    }
`

export default withRouter(Battle);//Now to get the history prop inside our component, we need wrap our component with withRouter while exporting it.

// Två hamstrar ställs mot varandra. Bara en kan vinna. Om det finns parametrar i URL ska de användas, annars två slumpade hamstrar (se routes ovan). Användaren röstar genom att klicka på den bild man tycker bäst om. När man röstat ska resultatet visas.


//RESULT 
// Visa resultatet av en match mellan två hamstrar. Man vill se så mycket information som möjligt om vinnaren - åtminstone bild och namn.