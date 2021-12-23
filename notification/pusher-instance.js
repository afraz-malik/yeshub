const config = require("config");
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: config.get("PUSHER.appId"),
    cluster: config.get("cluster"),
    secret: config.get("secret"),
    key: config.get("key"),
    encrypted: config.get("encrypted"),
});

module.exports = pusher;
