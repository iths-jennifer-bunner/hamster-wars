const {Router} = require('express');
const {db} = require('./../firebase');

const router = new Router();

//Get all hamsters
router.get('/', async (req, res) => {
    try{
        let hamsters = [];
        let snapShot = await db.collection('hamsters').get()

        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })
        res.send({hamsters : hamsters})
    }
    catch(err){res.status(500).send(err)}
})

//Get random hamster
router.get('/random', async (req, res) => {
    try{
        let hamsters = []        
        let snapShot = await db.collection('hamsters').get()

        snapShot.forEach(doc => {
            hamsters.push(doc.data())            
        })
        let random = hamsters[Math.floor(Math.random() * hamsters.length)]
            res.send(random)        
    }
    catch(err){res.status(500).send(err)}
})

//Get hamster by ID
router.get('/:id', async (req, res) => {
    try {
        let hamster;
        let snapShot= await db.collection('hamsters').where("id", "==", parseInt(req.params.id)).get()

        snapShot.forEach(doc => {
            hamster = doc.data()
        })
        res.send(hamster)
        // res.send({hamster: hamster}); //???
    }
    catch(err){res.status(500).send(err)}
})

//Update wins, defeats & games
router.put('/:id/result', async (req, res) => {
    try{
        let hamster;
        let snapShot = await db.collection('hamsters').where("id", "==", parseInt(req.params.id)).get()
        snapShot.forEach(doc => {
            hamster = doc.data()

            hamster.wins += parseInt(req.body.wins);
            hamster.defeats += parseInt(req.body.defeats);
            hamster.games ++;

            db.collection('hamsters').doc(doc.id).set(hamster)
            .then(res.send({ msg: 'Hamster updated' }))
            .catch(err => { throw err; })    
        })
    }
    catch (err) {res.status(500).send(err)}
})

//Post hamster
router.post("/", async (req, res) => {
    try {
        let hamsters = [];
        let snapShot = await db.collection('hamsters').get();

        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })

        db.collection('hamsters').doc().set({
            id: hamsters.length+1,
            name: req.body.name,
            age: req.body.age,
            favFood: req.body.favFood,
            loves: req.body.loves,
            imgName: `hamster-${hamsters.length+1}.jpg`,
            wins: 0,
            defeats: 0,
            games: 0
        });
        res.send({ msg: 'hamster uploaded!' });
    }
    catch(err) {
        res.status(500).send(err);
    }

})



module.exports = router;