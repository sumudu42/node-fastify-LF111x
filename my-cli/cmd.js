#!/usr/bin/env node
import got from 'got';

const API = 'http://localhost:3000';

const usage = (msg = 'Back office for my App') => {
    console.log(`\n${msg}\n`);
    console.log('   usage: my-cli <id> <amount>');
}

/** The process.argv property returns an array containig the command-line arguments passed when the Node.js process was launched
 *  - the first element in the process.argv array contains the full path to the currently executing node binary
 *  - the second element will be the path to the JavaScript file being executed 
 *  - the remining elements will be any additional command-line arguments
 *  - all the arguments that come from the command lines are in String format
 */
const argv = process.argv.slice(2);
console.log('argv: ', argv);
if (argv.length < 2) {
    usage();
    process.exit(1);
}

const [ id, amt ] = argv;    // array destructuring
console.log(`id: ${id}, amount: ${amt}`);
const amount = Number(amt);
if (Number.isInteger(amount) === false) {
    usage('Error: amount must be an integer');
    process.exit(1);
}

/** the got.post method returns a promise, which we await. 
 *  Usually the await keyword can only be used inside async functions (and async generator functions)
 *  However the ESM format supports the Top-Level Await syntax, therefore await keyword can be used outside any functions when using the ESM format
 */
try {
    await got.post(`${API}/orders/${id}`, { json: { amount } });
} catch (err) {
    console.log(err.message);
    process.exit(1);
}