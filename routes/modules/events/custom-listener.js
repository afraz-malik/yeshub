// const Logger = require('./events');
// const logger = new Logger();

// logger.on('logMessage',(arg) => {
//     console.log("Listened value => ",arg);
//  })

import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

eventEmitter.on("logMessage", (arg) => {
    console.log("Listened value => ", arg);
});

module.exports = eventEmitter;
