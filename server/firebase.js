const admin = require("firebase-admin")

const serviceAccount = require('./serviceAccount.json') 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fab-hamster-wars-app.firebaseio.com",
    storageBucket: "fab-hamster-wars-app.appspot.com"
});


const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();

module.exports = {auth, db, storage};