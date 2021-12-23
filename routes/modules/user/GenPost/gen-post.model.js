const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("mongoose-paginate-v2");

const genPostSchema = new Schema(
    {
        totalVotes: { type: Number, default: 0 },
        totalComments: { type: Number, default: 0 },
        isHidden: { type: Boolean, default: false },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        isPublished: { type: Boolean, default: true },
        eventApproved: { type: Number, default: 0 },
        postCommunity: { type: mongoose.Types.ObjectId },
        eventCommunities: [
            { type: mongoose.Types.ObjectId, ref: "KnowledgeGroup" },
        ],
        author: { type: mongoose.Types.ObjectId, ref: "User" },
        tags: [String],
        type: {
            type: Number,
            enum: [1, 2],
            required: [true, "Type must be specified"],
        }, // type: 1 => post, 2 => event
    },
    {
        timestamps: true,
    }
);

genPostSchema.plugin(paginate);
module.exports = mongoose.model("GeneralPost", genPostSchema);
