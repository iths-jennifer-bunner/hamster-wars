import React, {useState} from 'react';

const Battle = () => {
    const [click1, setClick1] =useState(false)
    const [click2, setClick2] =useState(false)

    return(
        <div>
            <p>Click the image that has the most fab hamster</p>
            <div onClick={() => setClick1(true)}>Pic 1{click1=== true ? ':I am the winner' : ''}</div>
            <div onClick={() => setClick2(true)}>Pic 2{click2=== true ? ':I am the winner' : ''}</div>
        </div>
    )
}
export default Battle;

// Två hamstrar ställs mot varandra. Bara en kan vinna. Om det finns parametrar i URL ska de användas, annars två slumpade hamstrar (se routes ovan). Användaren röstar genom att klicka på den bild man tycker bäst om. När man röstat ska resultatet visas.


//RESULT 
// Visa resultatet av en match mellan två hamstrar. Man vill se så mycket information som möjligt om vinnaren - åtminstone bild och namn.