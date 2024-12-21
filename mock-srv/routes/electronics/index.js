'use strict'

const data = [
    { id: 'A1', name: 'Vacuum Cleaner', rrp: '99.99', info: 'The suckiest vacuum in the world' },
    { id: 'A2', name: 'Leaf Blower', rrp: '300.00', info: 'This product will blow your socks off' }
];

module.exports = async function(fastify, opts) {
    fastify.get('/', async function(req, res) {
        return data;  // this will be automatically converted to a JSON string
    })
}