const mongoose = require("mongoose");
const Joi = require("joi");
var mongoosePaginate = require("mongoose-paginate-v2");

const notificationEventSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
            default: null,
        },
        message: {
            type: String,
            required: true,
            default: "",
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Event",
            default: null,
        },
        actionPerformed: {
            type: Boolean,
            required: false,
            default: false
        },
        dateTime: {
            type: Date,
            required: false,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false, // You should be aware of the outcome after set to false
    }
);
notificationEventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("EventNotification", notificationEventSchema);
