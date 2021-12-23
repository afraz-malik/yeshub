var events = require("events").EventEmitter;
var EventEmitter = new events();
const config = require("config");
const Pusher = require('pusher');
const settings = config.get('PUSHER');
const pusher = new Pusher(settings);

EventEmitter.on("send-message", arg => {
    // console.log(`${arg.event} triggered successfully a msg ${arg.data.message}`);
    pusher.trigger('messages', arg.event, arg.data);
});


//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.SendChatEvent = EventlogIt;
