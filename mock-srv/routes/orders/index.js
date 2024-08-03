'use strict'

module.exports = async function (fastify, opts) {

    function sendCurrentOrders(category, socket) {
        for (const order of fastify.currentOrders(request.params.category)) {
            socket.send(order);
        }
    }

    // attaches a message listener to the socket instance (passed in arguments)
    function monitorMessages(socket) {
        socket.on('message', (data) => {
            try {
                const { cmd, payload } = JSON.parse(data);
                if(cmd === 'update-category') {
                    sendCurrentOrders(payload.category, socket);
                }
            } catch (err) {
                fastify.log.warn(`WebSocket Message {data: %o} Error: %s`, data, err.message);
            }
        });
    }

    function customMonitorMessages(socket) {
        // register event listener for listening to incoming messages
        socket.on('message', (data) => {
            try {
                const parsedData = JSON.parse(data);
                if(data.cmd != null && data.cmd === 'update-category') {
                    sendCurrentOrders(payload.category, socket);
                }
            } catch(err) {
                fastify.log.warn(`WebSocket Message {data: %o} Error: %s`, data, err.message)
            }
        });
    }

    fastify.get('/:category', { websocket: true }, async (socket, request) => {
        monitorMessages(socket);
        sendCurrentOrders(request.params.category, socket);

        // asynchronously increment and send order totals for random products
        for await (const order of fastify.realtimeOrders()) {
            if (socket.readyState >= socket.CLOSING) break;
            socket.send(order);
        }
    });
}