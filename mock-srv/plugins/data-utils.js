'use strict'

const fp = require('fastify-plugin');

const catToPrefix = {
    electronics: 'A', 
    confectionery: 'B'
}

const calculateId = (idPrefix, data) => {
    const sorted = [...(new Set(data.map(({ id }) => id )))];
    const next = Number(sorted.pop().slice(1)) + 1;
    return `${idPrefix}${next}`;
}

module.exports = fp(async function (fastify, opts) {
    fastify.decorateRequest('mockDataInsert', function (category, data) {
        const request = this;
        console.log("REQUEST: ", request);
        const idPrefix = catToPrefix[category];
        const id = calculateId(idPrefix, data);
        data.push({id, ...request.body});  // requst.body contains {name, rrp, info}
    });
});