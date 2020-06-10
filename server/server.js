const port = process.env.PORT || 3001; 

server.use(express.static(__dirname + '/../build'));

server.listen(serverPort, () => console.log('Server is listening on port ' + serverPort));