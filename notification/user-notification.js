const pusher = require("./pusher-instance");
const EventEmitter = require("events").EventEmitter;

const eventEmitter = new EventEmitter();

const userEvent = {
    comunityRemoved: "removed-from-comunity",
};

for (const key in userEvent) {
    if (userEvent.hasOwnProperty(key)) {
        eventEmitter.on(userEvent[key], (event) => {
            pusher.trigger("user", userEvent[key], {
                ...event.data,
            });
        });
    }
}

module.exports = userEvent;
