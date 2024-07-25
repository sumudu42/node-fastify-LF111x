# FASTIFY NOTES

* Fastify works by dividing the service up into plugins. 
    -> A plugin is a module that exports a function. 
    -> The exported function is passed a Fastify instance an doptions.
    
* The fastify instance ca be used to register Routes, fastify.get() for GET routes
    -> The fastify.get() accepts a string representing the path and a route handler function
    -> When the route handler is an async function, the values returned from that function is sent to the response
    -> If a JavaScript object or array is returned, it is automatically coverted to JSON

* The name of the folder sets the path prefix for the route. 
    -> GET route with fastify.get('/electronics/foo') will be mounted at /electronics/foo
    -> GET route with fastify.get('/') will be mounted at /electronics -> path => 'localhost:3000/electronics'
    * A benefit of this is renaming the folder/directory will change the top-level route without any code modifications

## FASTIFY ROUTE MODEL

    module.exports = async function (fastify, opts) {
        fastify.get('/', async function(request, reply) {
            return {DATA HERE}
        });
    }

* It is important to note that the route handler function is also passed request and reply objects. These
    conceptually the same, but functionally different to the req and res objects passed to the Node core http.createServer()
    request listener function in that they have their own APIs.

## Real-time Functionality
At the core, real-time technology is about the instantaneous sending and receiving of real-time data, effectuating real-time functionality.
This functionality allows for the publishing and subscribing of data.
This information is transmitted and presented in milliseconds, mirroring real-time events.

## Async Generator Functions
* An async function produces a promise
* A generator function produces an iterable, which is an object which a next() function tht can be called to make the function progress to the next yield keyword in that function and returns the value of whatever is yielded
* An async generator funciton is a combination of both async functions and generator functions and it's useful for, **Asynchronously producing continuous state changes**
    * It returns an async iterable; an object with a next function that returns a promise which resolves to the value of whatever is yielded from the async function generator.
    * Async iterables can be looped over with **for await of** loop.
