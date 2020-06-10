const express = require('express');
const server = express();

const serverPort = process.env.PORT || 3001; 

server.use(express.static(__dirname + '/../build'));

server.listen(serverPort, () => console.log('Server is listening on port ' + serverPort));