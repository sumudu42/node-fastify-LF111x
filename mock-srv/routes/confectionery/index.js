'use strict'


const data = [
    { id: 'B1', name: 'Chocolate Bar', rrp: '22.99', info: 'Delicious overpriced chocolate' },
];

module.exports = async function(fastify, opts) {
    fastify.get('/', async function (request, reply) {
        return data;
    });
}