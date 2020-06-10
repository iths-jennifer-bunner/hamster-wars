const {Router} = require('express');
const {db} = require('./../firebase');

const router = new Router();

//Get top 5 winners
router.get('/top', async (req, res) => {
    try{
        let hamsters = []
        let snapShot = await db.collection('hamsters').orderBy("wins", "desc").limit(5).get()

            snapShot.forEach(doc => {
                hamsters.push(doc.data());
            })
        res.send(hamsters)
    }
    catch(err){res.status(500).send(err)}    
} )

//Get bottom 5 
router.get('/bottom', async (req, res) => {
    try{
        let hamsters = []
        let snapShot = await db.collection('hamsters').orderBy("defeats", "desc").limit(5).get()

            snapShot.forEach(doc => {
                hamsters.push(doc.data());
            })
        res.send(hamsters)
    }
    catch(err){res.status(500).send(err)}    
} )

module.exports = router;