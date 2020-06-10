const {Router} = require('express');
const {db} = require('./../firebase');

const router = new Router();

router.get('/total', async (req, res) => {
    try {
        let numbers = []
        let snapShot = await db.collection('games').get()

        snapShot.forEach(doc => {
            numbers.push(doc.data());
        })
    res.send({totalGames : numbers.length})
    }
    catch(err){res.status(500).send(err)}
})



module.exports = router;