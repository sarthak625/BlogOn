const http = require('http');
const app  = require('./app');

// Create server
const server = http.createServer(app);

let port = process.env.PORT || 3000;

app.set('port',port);

// Listen on port
server.listen(port);

server.on('listening', onListening);
server.on('error', onError);

function onListening(){
    let address = server.address();
    console.log(`Listening on port ${address.port}`);
} 

function onError(error){
    console.log(`Error occurred ${error}`);
}