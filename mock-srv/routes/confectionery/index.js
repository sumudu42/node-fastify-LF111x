'use strict'

const data = [
    {id: 'B1', name: 'Chocolate bar', rrp: '20.00', info: 'Delicious overpriced chocolate.'}
];


module.exports = async function (fastify, opts) {
    /*** the fastify.get() method accepts the path and a route handler function */
    fastify.get('/', async function (request, reply) {
        return data;
    });

    fastify.post('/', async function (request, reply) {
        /** the opts.prefix contains the route prefix -> /confectionery */
        console.log(request);
        request.mockDataInsert(opts.prefix.slice(1), data);
        return data;
    });
}