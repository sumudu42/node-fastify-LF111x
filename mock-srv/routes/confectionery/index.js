'use strict'

const data = [
    {id: 'B1', name: 'Chocolate bar', rrp: 20.00, info: 'Delicious overpriced chocolate.'}
];


module.exports = async function (fastify, opts) {
    /*** the fastify.get() method accepts the path and a route handler function */
    fastify.get('/', async function (request, reply) {
        return data;
    });
}