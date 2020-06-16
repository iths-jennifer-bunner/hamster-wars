const { Router } = require('express');
const router = new Router();

  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAPVpLAu40mJKb0bA3lxxtOtrYm5aRsrQc",
    authDomain: "fab-hamster-wars-app.firebaseapp.com",
    databaseURL: "https://fab-hamster-wars-app.firebaseio.com",
    projectId: "fab-hamster-wars-app",
    storageBucket: "fab-hamster-wars-app.appspot.com",
    messagingSenderId: "145232766001",
    appId: "1:145232766001:web:191fe77b8b4b5035232110"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Uppladdning av bilder till firebase storage.
document.querySelector("button").addEventListener("click", (e) => {
     e.preventDefault(); //Förhindrar att sidan laddas om vid knapptryck.

    let file = document.querySelector("#file").files[0];
    let storageRef = firebase.storage().ref("hamsters/" + file.name);
    storageRef.put(file);
})