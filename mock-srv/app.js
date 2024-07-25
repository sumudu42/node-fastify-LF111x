'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

const cors = require('@fastify/cors');
const websocket = require('@fastify/websocket')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // setup CORS access for cross-domain requests
  fastify.register(cors);
  fastify.register(websocket);

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options