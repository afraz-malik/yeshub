const mongoose = require("mongoose");
const { model } = require("./userSchema");

const Schema = mongoose.Schema;

const EventGoingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    event: { type: Schema.Types.ObjectId, ref: "event" },
    action: {
        type: Number,
        enum: [0, 1, 2], // 0: not going & not interested, 1: going, 2: interested
    },
});

module.exports = mongoose.model("EventGoings", EventGoingSchema);
