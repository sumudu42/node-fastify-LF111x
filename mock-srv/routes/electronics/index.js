'use strict'

const data = [
    {id: 'A1', name: 'Vacuum Cleaner', rrp: '100.00', info: 'The suckiest vacuum in the world'},
    {id: 'A2', name: 'Leaf Blower', rrp: '250.00', info: 'This product will blow your socks off'},
];

// the fastify.get() method accepts the path and route handler function
// when the route handler is an async function, the data returned from the function is sent to the response
module.exports = async function(fastify, opts) {

    // GET
    fastify.get('/', async function(req, res) {
        return data;
    });

    // POST
    fastify.post('/', async function(req, res) {
        req.mockDataInsert(opts.prefix.slice(1), data);
        return data;    // return the modified data array
    });
}