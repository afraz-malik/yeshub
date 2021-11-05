const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");
const number = require("joi/lib/types/number");
Joi.objectId = require("joi-objectid")(Joi); //to validate mongoose object id _id

const characteristicsSchema = {
    type: String,
    required: false,
    default: null,
}; //benefits of event
const linksSchema = {
    title: {
        type: String,
        required: false,
        default: null,
    },
    url: {
        type: String,
        required: false,
        default: null,
    },
};
const dateSchema = {
    startDate: {
        type: Date,
        // required: true,
    }, // Event Start Date
    endDate: {
        type: Date,
        // required: true,
    }, //Event last date
};
const subEventSchema = {
    title: { type: String },
    date: {
        type: Date,
        required: true,
    }, // Event Start Date
    startTime: {
        type: Date,
        required: true,
    }, //Event start and last time
    timezone: String,
    endTime: {
        type: Date,
        required: true,
    }, //Event start and last time
    description: {
        type: String,
        required: true,
        trim: true,
    }, //description of the sub event,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
};
const eventSchema = new mongoose.Schema(
    {
        isHidden: { type: Boolean, default: false },
        parentID: String,
        eventName: {
            type: String,
            // required: true,
            trim: true,
        }, //event Name
        date: dateSchema,
        time: {
            startTime: {
                type: Date,
                required: false,
            }, //Event start and last time
            endTime: {
                type: Date,
                required: false,
            },
        },
        timezone: { type: String },
        images: [String],
        hostedBy: {
            type: String,
            // required: true,
            trim: true,
        }, //Event Hoster person name
        coHostedBy: {
            type: String,
            // required: true,
            trim: true,
        }, //Here comes organization full name
        description: {
            type: String,
            // required: true,
            trim: true,
        }, //Complete description of the event
        slug: {
            type: String,
            // required: true,
        },
        country: {
            type: String,
            trim: true,
            // required: true,
        },
        city: {
            type: String,
            // required: true,
        },
        // venue: {
        //     type: String,
        //     // required: true
        // }, //Place where Event being held
        address: {
            type: String,
            trim: true,
        },
        contactRsvp: {
            type: String,
            trim: true,
            // required: false
        },
        inviteRejected: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        invited: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        knowledgeGroup: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: "Knowledgegroup",
            },
        ], //Community ID
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
            default: null,
        }, //Profile ID
        link: [linksSchema], //Related links
        characteristics: [characteristicsSchema], //characteristics of events
        subEvent: [subEventSchema],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isPublished: {
            type: Boolean,
            required: false,
            default: true,
        },
        isNotify: {
            type: Boolean,
            required: false,
            default: false,
        },
        notifyUser: {
            type: Number,
            required: false,
            default: true,
        },
        isSubscribed: {
            type: Boolean,
            required: false,
            default: false,
        },
        status: { type: Number, default: 0, enum: [0, 1, 2] }, // 0: pending, 1: approved 2: rejected
        isFeatured: { type: Number, default: 0 }, // 0:not, 1:pending, 2: approved, 3: rejected
        totalLikes: { type: Number, default: 0 },
        totalComments: { type: Number, default: 0 },
    },
    {
        id: false,
        timestamps: true,
        versionKey: false, // You should be aware of the outcome after set to false
    }
);

// eventSchema.index({ eventName: 'text', description: 'text', country: 'text'});
eventSchema.index({ name: "text", country: "text" });
eventSchema.index({ name: "text", description: "text" });
eventSchema.index({ name: "text", eventName: "text" });

eventSchema.virtual("upVoteCount", {
    ref: "EventVote",
    localField: "_id",
    foreignField: "eventId",
    count: true,
    match: { voteType: "up" },
});

eventSchema.virtual("downVoteCount", {
    ref: "EventVote",
    localField: "_id",
    foreignField: "eventId",
    count: true,
    match: { voteType: "down" },
});

eventSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "eventId",
});

eventSchema.virtual("commentsCount", {
    ref: "Comment",
    localField: "_id",
    foreignField: "eventId",
    count: true,
});

eventSchema.set("toObject", { virtuals: true });
eventSchema.set("toJSON", { virtuals: true });

eventSchema.plugin(mongoosePaginate);

eventSchema.methods.validateEvent = (event) => {
    const schema = {
        eventName: Joi.string().max(255).required(),
        date: Joi.object().keys({
            startDate: Joi.date().optional(),
            endDate: Joi.date().optional(),
        }),
        time: Joi.object()
            .keys({
                startTime: Joi.string().optional(),
                endTime: Joi.string().optional(),
            })
            .optional(),
        timezone: Joi.string().optional(),
        hostedBy: Joi.string().required(),
        coHostedBy: Joi.string().optional(),
        description: Joi.string().required(),
        country: Joi.string().allow("").optional(),
        city: Joi.string().allow("").optional(),
        // venue: Joi.string().required(),
        address: Joi.string().allow("").optional(),
        contactRsvp: Joi.string().allow("").optional(),
        profile: Joi.string().optional(),
        link: Joi.array()
            .items(
                Joi.object().keys({
                    title: Joi.string().allow("").optional(),
                    url: Joi.string().allow("").optional(),
                })
            )
            .optional(),
        images: Joi.array().optional(),
        moderators: Joi.array().optional(),
        author: Joi.string().optional(),
        subEvent: Joi.array()
            .items(
                Joi.object().keys({
                    title: Joi.string()
                        .required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.type) {
                                    case "any.empty":
                                        err.message =
                                            "Subevents Title should not be empty!";
                                        break;
                                    case "string.min":
                                        err.message = `Value should have at least ${err.context.limit} characters!`;
                                        break;
                                    case "string.max":
                                        err.message = `Value should have at most ${err.context.limit} characters!`;
                                        break;
                                    default:
                                        break;
                                }
                            });
                            return errors;
                        }),
                    date: Joi.date().optional(),
                    startTime: Joi.date().optional(),
                    endTime: Joi.date().optional(),
                    timezone: Joi.string().optional(),
                    description: Joi.string()
                        .required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.type) {
                                    case "any.empty":
                                        err.message =
                                            "Subevents Title should not be empty!";
                                        break;
                                    case "string.min":
                                        err.message = `Value should have at least ${err.context.limit} characters!`;
                                        break;
                                    case "string.max":
                                        err.message = `Value should have at most ${err.context.limit} characters!`;
                                        break;
                                    default:
                                        break;
                                }
                            });
                            return errors;
                        }),
                })
            )
            .optional(),
        characteristics: Joi.array().items(Joi.string().optional()).optional(),
        isPublished: Joi.boolean().optional(),
        //ID: Joi.objectId().optional().error(() => '"ID" is not valid'),
        slug: Joi.string().optional(),
        notifyUser: Joi.number().optional(),
    };

    return Joi.validate(event, schema);
};

eventSchema.methods.validateEventEdit = (event) => {
    const schema = {
        _id: Joi.string().optional(),
        eventName: Joi.string().max(255).required(),
        date: Joi.object().keys({
            _id: Joi.string().optional(),
            startDate: Joi.date().optional(),
            endDate: Joi.date().optional(),
        }),
        time: Joi.object()
            .keys({
                _id: Joi.string().optional(),
                startTime: Joi.string().optional(),
                endTime: Joi.string().optional(),
            })
            .optional(),

        timezone: Joi.string().optional(),
        hostedBy: Joi.string().required(),
        coHostedBy: Joi.string().allow("").optional(),
        description: Joi.string().required(),
        country: Joi.string().allow("").optional(),
        city: Joi.string().allow("").optional(),
        // venue: Joi.string().required(),
        address: Joi.string().allow("").optional(),
        contactRsvp: Joi.string().allow("").optional(),
        knowledgeGroup: Joi.array()
            .items(Joi.string().optional())
            .empty(null)
            .allow(null)
            .default([])
            .optional(),
        profile: Joi.string().optional(),
        link: Joi.array()
            .items(
                Joi.object().keys({
                    _id: Joi.string().optional(),
                    title: Joi.string().allow("").optional(),
                    url: Joi.string().allow("").optional(),
                })
            )
            .optional(),
        images: Joi.array().optional(),
        moderators: Joi.array().optional(),
        author: Joi.object()
            .keys({
                email: Joi.string().optional(),
                _id: Joi.string().optional(),
                userName: Joi.string().optional(),
                userImage: Joi.string().optional(),
            })
            .optional(),
        createdAt: Joi.date().optional(),
        updatedAt: Joi.date().optional(),
        id: Joi.string().optional(),
        subEvent: Joi.array()
            .items(
                Joi.object()
                    .keys({
                        title: Joi.string()
                            .required()
                            .error((errors) => {
                                errors.forEach((err) => {
                                    switch (err.type) {
                                        case "any.empty":
                                            err.message =
                                                "Subevents Title should not be empty!";
                                            break;
                                        case "string.min":
                                            err.message = `Value should have at least ${err.context.limit} characters!`;
                                            break;
                                        case "string.max":
                                            err.message = `Value should have at most ${err.context.limit} characters!`;
                                            break;
                                        default:
                                            break;
                                    }
                                });
                                return errors;
                            }),
                        date: Joi.date().optional(),
                        startTime: Joi.date().optional(),
                        endTime: Joi.date().optional(),
                        description: Joi.string()
                            .required()
                            .error((errors) => {
                                errors.forEach((err) => {
                                    switch (err.type) {
                                        case "any.empty":
                                            err.message =
                                                "Subevents description should not be empty!";
                                            break;
                                        case "string.min":
                                            err.message = `Value should have at least ${err.context.limit} characters!`;
                                            break;
                                        case "string.max":
                                            err.message = `Value should have at most ${err.context.limit} characters!`;
                                            break;
                                        default:
                                            break;
                                    }
                                });
                                return errors;
                            }),
                        timezone: Joi.string().optional(),
                    })
                    .optional()
            )
            .optional(),
        characteristics: Joi.array().items(Joi.string().optional()),
        isPublished: Joi.boolean().optional(),
        //ID: Joi.objectId().optional().error(() => '"ID" is not valid'),
        status: Joi.number().optional(),
        isFeatured: Joi.number().optional(),
        totalLikes: Joi.number().optional(),
        totalComments: Joi.number().optional(),
        parentID: Joi.string().optional(),
        slug: Joi.string().optional(),
        notifyUser: Joi.number().required(),
    };

    return Joi.validate(event, schema);
};

module.exports = {
    model: mongoose.model("Event", eventSchema),
    schema: eventSchema,
};
