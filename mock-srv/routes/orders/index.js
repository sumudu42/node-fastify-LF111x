'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/:category', { websocket: true }, async (socket, request) => {
        console.log("request received: ", request);
        // send out current order totals for the selected category
        for(const order of fastify.currentOrders(request.params.category)) {
            socket.send(order);
        }

        // asynchronously produce and send state changes
        for await (const order of fastify.realtimeOrders()) {
            if(socket.readyState >= socket.CLOSING) break;
            socket.send(order);
        }
    });
}