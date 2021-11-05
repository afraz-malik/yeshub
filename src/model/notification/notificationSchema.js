const mongoose = require("mongoose");
const Joi = require("joi");
var mongoosePaginate = require("mongoose-paginate-v2");

const notificationSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
            default: null,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
            default: null,
        },
        moderator: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
            default: null,
        },
        notificationType: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
            default: "",
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Post",
            default: null,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Event",
            default: null,
        },
        community: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Knowledgegroup",
            default: null,
        },
        person: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
            default: null,
        },
        isRead: {
            type: Boolean,
            required: false,
            default: false,
        },
        actionPerformed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false, // You should be aware of the outcome after set to false
    }
);
notificationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Notification", notificationSchema);
