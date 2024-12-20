'use strict'

const http = require('http');
const PORT = 3000;

const data = [
    { id: 'A1', name: 'Vacuum Cleaner', rrp: '99.99', info: 'The suckiest vacuum in the world' },
    { id: 'A2', name: 'Leaf Blower', rrp: '300.00', info: 'This product will blow your socks off' },
    { id: 'B1', name: 'Chocolate Bar', rrp: '22.99', info: 'Delicious overpriced chocolate' },
];

/**
 * createServer function accepts a request listener function, which accepts two arguments -> req, res and returns a server instance
 * req object provides an API for interacting with the incoming HTTP request. Is an instance of http.IncomingMessge
 * res object provides an API for specifying the outgoing response. The res.end(data) call sends the data (JSON string) 
 * as the body of the http response and ends the connection.
 */
const server = http.createServer((req, res) => {
    // set response headers
    res.setHeader('Access-Control-Allow-Origin', '*');   // cors headers - allow for all origins
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(data));
});

console.log("Listening on port: ", PORT);
server.listen(PORT);