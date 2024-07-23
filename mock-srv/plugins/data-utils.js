'use strict'

const fp = require('fastify-plugin');

const catToPrefix = {
    electronics: 'A',
    confectionery: 'B'
};

const calculateId = (idPrefix, data) => {
    const next = data.length + 1;
    return `${idPrefix}${next}`;
}

// decorateRequest API is used to add new methods/properties to the core Request object
// in decorateRequest, using an arrow funciton will break the binding of 'this' to 
// the fastify Request instance 
module.exports = fp(async function(fastify, opts) {
    fastify.decorateRequest('mockDataInsert', function insert (category, data) {
        const request = this;
        const idPrefix = catToPrefix[category];
        const id = calculateId(idPrefix, data);
        data.push({id, ...request.body});
    })
});