'use strict'

const port = 3000;
const { createServer } = require('http');

const data = [
    {id: 'A1', name: 'Vacuum Cleaner', rrp: 100.00, info: 'The suckiest vacuum in the world.'},
    {id: 'A2', name: 'Leaf Blower', rrp: 250.00, info: 'This product will blow your socks off.'},
    {id: 'B1', name: 'Chocolate bar', rrp: 20.00, info: 'Delicious overpriced chocolate.'}
];


/** the createServer() function returns a server instance and accepts a request listener function
 * the request listener function accepts two arguments -> req and res
 * the req object provides an API for interacting with the incoming HTTP request, is an instance of http.IncomingMessage
 * the res object provides an API for specifying the outgoing response
 * the res.end() call sends the data in the HTTP response obody and then ends the connection
 */
const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    /** send data and close the connection */
    res.end(JSON.stringify(data));
});

console.log(`Server listening on port: ${port}`);
server.listen(port);