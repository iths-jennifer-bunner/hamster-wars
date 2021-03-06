//ingång till api
const express = require('express');
let path = require('path');
const app = express();

const port = process.env.PORT || 2048;

app.use(express.json())
//app.use(express.static('public'))
app.use(express.static(__dirname + '/../build'))

// let init = require('./initdb.js')

const hamstersRoute = require('./routes/hamsters')
const chartsRoute = require('./routes/charts')
const gamesRoute = require('./routes/games')
const statsRoute = require('./routes/stats')
const assetsRoute = require('./routes/assets')
// const imagesRoute = require('./routes/images')

app.use('/api/hamsters', hamstersRoute)
app.use('/api/charts', chartsRoute)
app.use('/api/games', gamesRoute)
app.use('/api/stats', statsRoute)
app.use('/api/assets', assetsRoute)
// app.use('/api/images', imagesRoute)

// app.get('*', (req, res) => {
//     let filePath = path.resolve('./build/index.html');
//     res.sendFile(filePath)
// }

app.get('*', (req,res) => {
    let filePath = path.resolve('./build/index.html')
    res.sendFile(filePath)
})

//     // app.use(express.static(path.join(__dirname, '/../build')))
//     // let filePath = path.join(__dirname ,'/../build', 'index.html');
//     res.sendFile(filePath);
// })

// app.get('/*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/../build/index.html'));
// });
//denna funkar bäst

app.listen(port, () => {
    console.log('Server is up and running on: ', port);
    
})

