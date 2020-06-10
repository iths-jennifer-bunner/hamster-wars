//ingång till api
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static('public'))
app.use(express.static(__dirname + '/../build'))

// let init = require('./initdb.js')

const hamstersRoute = require('./routes/hamsters')
const chartsRoute = require('./routes/charts')
const gamesRoute = require('./routes/games')
const statsRoute = require('./routes/stats')
const assetsRoute = require('./routes/assets')

app.use('/api/hamsters', hamstersRoute)
app.use('/api/charts', chartsRoute)
app.use('/api/games', gamesRoute)
app.use('/api/stats', statsRoute)
app.use('/api/assets', assetsRoute)



app.listen(port, () => {
    console.log('Server is up and running! ');
    
})

