'use strict'

module.exports = async function(fastify, opts) {
    function monitorMessages(socket) {}
}

module.exports = async function (fastify, opts) {
    fastify.get('/:category', { websocket: true }, async (socket, request) => {
        console.log(request.params.category);
        for (const order of request.currentOrders(request.params.category)) {
            socket.send(order);
        }

        for await (const order of request.realtimeOrders()) {
            if(socket.readyState >= socket.CLOSING) break;
            socket.send(order);
        }
    });
}