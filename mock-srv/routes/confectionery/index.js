'use strict'

const data = [
    {id: 'B1', name: 'Chocolate Bar', rrp: '25.00', info: 'Delicious overpriced chocolate'},
];

module.exports = async function(fastify, opts) {

    // GET 
    fastify.get('/', async function(req, res) {
        return data;
    });

    // POST
    fastify.post('/', async function(req, res) {
        // the opts.prefix contain the route prefix -> /confectionery
        req.mockDataInsert(opts.prefix.slice(1), data);
        return data;
    });
}