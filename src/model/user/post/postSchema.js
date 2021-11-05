const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");
//Joi.objectId = require('joi-objectid')(Joi);//to validate mongoose object id _id
const LikeDislike = {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
};
const imageSchema = {
    type: String,
    required: false,
    default: null,
};
const hashTagSchema = {
    type: String,
    required: false,
    default: null,
};
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

const postSchema = new mongoose.Schema(
    {
        parentID: String,
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
        },
        knowledgeGroup: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Knowledgegroup",
            default: null,
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
            default: null,
        },
        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "Category"
        // },
        totalVotes: { type: Number, default: 0 },
        totalComments: { type: Number, default: 0 },
        likes: [LikeDislike],
        disLikes: [LikeDislike],
        image: [imageSchema],
        link: [linksSchema],
        tags: [hashTagSchema],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isPublished: {
            type: Boolean,
            required: false,
            default: true,
        },
        isPined: { type: Boolean, default: false },
        videoUrl: { type: String, required: false, default: "" },
        isCaseStudy: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3],
        }, //2 pending, 0 not case study, 1 casestudy, 3 rejected
        isFeaturedCaseStudy: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false, // You should be aware of the outcome after set to false
    }
);
postSchema.plugin(mongoosePaginate);

postSchema.methods.validatePost = (post) => {
    const schema = {
        title: Joi.string().max(255).required(),
        description: Joi.string().allow("").optional(),
        slug: Joi.string().required(),
        knowledgeGroup: Joi.string().optional(),
        videoUrl: Joi.string().allow("").optional(),
        tags: Joi.array().items(Joi.string().optional()),
        link: Joi.array()
            .items(
                Joi.object().keys({
                    title: Joi.string().optional(),
                    url: Joi.string().uri().optional(),
                })
            )
            .optional(),
        isPublished: Joi.boolean().optional(),
    };

    return Joi.validate(post, schema);
};

postSchema.virtual("upVoteCount", {
    ref: "PostVote",
    localField: "_id",
    foreignField: "postId",
    count: true,
    match: { voteType: "up" },
});

postSchema.virtual("downVoteCount", {
    ref: "PostVote",
    localField: "_id",
    foreignField: "postId",
    count: true,
    match: { voteType: "down" },
});

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
});

postSchema.virtual("commentsCount", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
    count: true,
});

postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", postSchema);
