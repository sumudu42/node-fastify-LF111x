'use strict'

const { promisify } = require('util');
const fp = require('fastify-plugin');
const timeout = promisify(setTimeout);

const orders = {
    A1: { total: 4 },
    A2: { total: 8 },
    B1: { total: 20 }
};

const catToPrefix = {
    electronics: 'A',
    confectionery: 'B'
}

const calculateId = (idPrefix, data) => {
    const sorted = [...(new Set(data.map(({ id }) => id)))];
    const next = Number(sorted.pop().slice(1)) + 1;
    return `${idPrefix}${next}`;
}

/** async generator function to produce continuous state changes
 * returns an async iterable, which is an object with a next function that retunrs a procise which 
 *      resolves to the value of whatever s yielded from the async function generator
 * this function produces continuous state changes
 * once it starts running,
 *      * it increments order total for a random product (from list of products)
 *      * returns the updated product id and order total
 *      * produces continuous state changes in intervals of 1.5 seconds
 */
async function* realtimeOrdersSimulator() {
    const ids = Object.keys(orders);
    while (true) {
        const delta = Math.floor(Math.random() * 5) + 1;
        const id = ids[Math.floor(Math.random() * ids.length)];
        orders[id].total += delta;
        const { total } = orders[id];
        yield JSON.stringify({ id, total });
        await timeout(1500);
    }
}

/** this function returns all the order totals for a given category
 * -> takes a category name and maps it to an ID prefix
 * -> then gets all the products in the orders object with that ID prefix
 * -> loopes over them and yields a serialized object containing the ID and order total for that ID
 */
function * currentOrders(category) {
    const idPrefix = catToPrefix[category];
    if(!idPrefix) return;
    const ids = Object.keys(orders).filter((id) => id[0] === idPrefix);
    for(const id of ids) {
        yield JSON.stringify({id, ...orders[id]})
    } 
}

function mockDataInsert(category, data) {
    const request = this;
    const idPrefix = catToPrefix[category];
    const id = calculateId(idPrefix, data);
    orders[id] = { total: 0 };
    data.push({ id, ...request.body});  // request.body contains -> name, rrp, info
}

module.exports = fp(async function (fastify, opts) {
    fastify.decorate('currentOrders', currentOrders);
    fastify.decorate('realtimeOrders', realtimeOrdersSimulator);
    fastify.decorateRequest('mockDataInsert', mockDataInsert);
});