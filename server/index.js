//ingång till api
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.static('public'))

// let init = require('./initdb.js')

const hamstersRoute = require('./routes/hamsters')
const chartsRoute = require('./routes/charts')
const gamesRoute = require('./routes/games')
const statsRoute = require('./routes/stats')
const assetsRoute = require('./routes/assets')

app.use('/hamsters', hamstersRoute)
app.use('/charts', chartsRoute)
app.use('/games', gamesRoute)
app.use('/stats', statsRoute)
app.use('/assets', assetsRoute)



app.listen(3000, () => {
    console.log('Server is up and running! ');
    
})

