const {Router} = require('express');
const {db} = require('./../firebase');

const router = new Router();

//Get top 5 winners
router.get('/top', async (req, res) => {
    try{
        let topHamsters = [];
        let snapShot = await db.collection('hamsters').orderBy("wins", "desc").limit(5).get()

            snapShot.forEach(doc => {
                topHamsters.push(doc.data());
            })
        res.send({topHamsters: topHamsters})
        console.log('top5',topHamsters);
        
    }
    catch(err){res.status(500).send(err)}    
} )

//Get bottom 5 
router.get('/bottom', async (req, res) => {
    try{
        let bottomHamsters = [];
        let snapShot = await db.collection('hamsters').orderBy("defeats", "desc").limit(5).get()

            snapShot.forEach(doc => {
                bottomHamsters.push(doc.data());
            })
        res.send({bottomHamsters: bottomHamsters})
        console.log('bottom5',bottomHamsters);
    }
    catch(err){res.status(500).send(err)}    
} )

module.exports = router;