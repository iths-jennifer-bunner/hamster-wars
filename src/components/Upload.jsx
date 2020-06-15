import React, {useState} from 'react';
import './Upload.css'

const Upload = () => {
    const [hamsterUploaded, setHamsterUploaded] = useState('');

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [favoriteFood, setFavoriteFood] = useState('')
    const [loves, setLoves] = useState('')
    const [imageUpload, setImageUpload] = useState('')

    const [nameTouched, setNameTouched] = useState(false)
    const [ageTouched, setAgeTouched] = useState(false)
    const [favoriteFoodTouched, setFavoriteFoodTouched] = useState(false)
    const [lovesTouched, setLovesTouched] = useState(false)
    const [imageUploadTouched, setImageUploadTouched] = useState(false)

    let [nameClass, nameError] = nameTouched ? validateName(name) : ['','']
    let [ageClass, ageError] = ageTouched ? validateAge(age) : ['','']
    let [favoriteFoodClass, favoriteFoodError] = favoriteFoodTouched ? validateFavoriteFood(favoriteFood) : ['','']
    let [lovesClass, lovesError] = lovesTouched ? validateLoves(loves) : ['','']
    let [imageUploadClass, imageUploadError] = imageUploadTouched ? validateImageUpload(imageUpload) : ['','']

    let formIsValid = nameTouched && ageTouched && favoriteFoodTouched && lovesTouched && imageUploadTouched && (nameError === '') && (ageError === '') && (favoriteFoodError === '') && (lovesError === '') && (imageUploadError === '')


    return(
        <div>
            <h3>Upload your own fab hamster</h3>
            <div className='form-group'>
                <label>Name:</label>
                    <input type='text' placeholder='Name'
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    className={nameClass}/>
                    <div className='error'>{nameError}</div>
            </div>
            <div className='form-group'>
                    <label>Age:</label>
                    <input type='text' placeholder='Age'
                    onChange={e => setAge(e.target.value)}
                    onBlur={() => setAgeTouched(true)}
                    className={ageClass}/>
                    <div className='error'>{ageError}</div>
            </div>
            <div className='form-group'>
                <label>Favorite food:</label>
                    <input type='text' placeholder='Favorite food'
                    onChange={e => setFavoriteFood(e.target.value)}
                    onBlur={() => setFavoriteFoodTouched(true)}
                    className={favoriteFoodClass}/>
                    <div className='error'>{favoriteFoodError}</div>
            </div>
            <div className='form-group'>
                <label>Loves:</label>
                    <input type='text' placeholder='i.e. Running that wheeeeeeeeeeeeeeeel! '
                    onChange={e => setLoves(e.target.value)}
                    onBlur={() => setLovesTouched(true)}
                    className={lovesClass}/>
                    <div className='error'>{lovesError}</div>
            </div>
            <div className='form-group'>
                <label>Upload image:</label>
                    <input type='text' placeholder='image file '
                    onChange={e => setImageUpload(e.target.value)}
                    onBlur={() => setImageUploadTouched(true)}
                    className={imageUploadClass}/>
                    <div className='error'>{imageUploadError}</div>
            </div>
            <div className='form-group'>
                <button disabled ={!formIsValid}
                onClick={() => upload(name,age,loves,favoriteFood)}>
                    Upload hamster
                </button>
                <p>{hamsterUploaded ? {setHamsterUploaded} : ''} </p>
            </div>
        </div>
        )


function validateName(name){
    if(name.length > 0){
        return['valid' , '']
    }else{
        return['invalid', `What's your fab hamsters name?`]
    }
}

function validateAge(age){
    let ageAsNumber = Number(age)
    if(isNaN(ageAsNumber) || age ===''){
        return['invalid', 'Whats your fab hamsters age ']
    }else{
        return['valid', '']
    }
}

function validateFavoriteFood(favoriteFood){
    if(favoriteFood.length > 0){
        return['valid' , '']
    }else{
        return['invalid', `What's your fab hamsters favorite food?`]
    }
}

function validateLoves(loves){
    if(loves.length > 0){
        return['valid' , '']
    }else{
        return['invalid', `What do your fab hamsters loves?`]
    }
}

function validateImageUpload(imageUpload){
    if(imageUpload.length > 0){
        return['valid' , '']
    }else{
        return['invalid', `must contain correct file name`]
    }
}

function upload(name, age, loves, favoriteFood) {

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({'name': name,'age': age,'favFood': favoriteFood,'loves': loves});

    let request = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch('/api/hamsters', request)
    .then(response => response.text())
    .then(result => {console.log(result)})
    //setHamsterUploaded(result.hamster)
    .catch(error => console.log('error', error));
}

}
export default Upload ;

// Här ska det finnas ett formulär för att fylla i all information om en tävlande hamster som databasen behöver. All information ska valideras så att den är informativ och användarvänlig. Man behöver inte ladda upp en riktig bild i grundversionen.