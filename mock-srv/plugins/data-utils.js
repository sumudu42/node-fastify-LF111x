'use strict'

const fp = require('fastify-plugin');
const { promisify } = require('util');
const timeout = promisify(setTimeout);

const catToPrefix = {
    electronics: 'A',
    confectionery: 'B'
};

const orders = {
    A1: { total: 3 },
    A2: { total: 4 },
    B1: { total: 10 },
}

const calculateId = (idPrefix, data) => {
    const next = data.length + 1;
    return `${idPrefix}${next}`;
}

// async generator function 
// produces an async iterable that can be looped over with a 'for await of' loop
// Math.random() -> returns a floating point, pseudo-random number n, 0<= n < 1
async function * realtimeOrdersSimulator() {
    const ids = Object.keys(orders);  // return an array consisting of object ids
    while(true) {
        const delta = Math.floor(Math.random() * 7) + 1;
        const index = Math.floor(Math.random() * ids.length);
        const id = ids[index];
        orders[id].total += delta;
        const { total } = orders[id];  // object destructuring -> get the total for a given id
        yield JSON.stringify({id, total});
        await timeout(1500);
    }
}

// synchronous generator function
function * currentOrders(category) {
    console.log('executing currentOrders function');
    const idPrefix = catToPrefix[category];
    if(!idPrefix) return;
    const ids = Object.keys(orders).filter( (id) => id[0] === idPrefix);
    console.log('object ids: ', ids);
    for(const id of ids) {
        yield JSON.stringify({id, ...orders[id]})
    }
}

function insertNewItem(category, data) {
    const request = this;
    const idPrefix = catToPrefix[category];
    const id = calculateId(idPrefix, data);
    orders[id] = { total: 0 };
    data.push({ id, ...request.body });
}

// decorateRequest API is used to add new methods/properties to the core Request object
// in decorateRequest, using an arrow funciton will break the binding of 'this' to 
// the fastify Request instance 
module.exports = fp(async function (fastify, opts) {
    fastify.decorateRequest('currentOrders', currentOrders);
    fastify.decorateRequest('realtimeOrders', realtimeOrdersSimulator);
    fastify.decorateRequest('mockDataInsert', insertNewItem);
});