const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate-v2");

let commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "user is required"],
        },
        postId: { type: Schema.Types.ObjectId, ref: "Post" },
        eventId: { type: Schema.Types.ObjectId, ref: "Event" },
        commentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        body: {
            type: String,
            trim: true,
            required: [true, "Empty comment is not allowed"],
        },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
    },
    {
        id: false,
        timestamps: true,
        versionKey: false,
    }
);

commentSchema.virtual("upVoteCount", {
    ref: "CommentVote",
    localField: "_id",
    foreignField: "commentId",
    count: true,
    match: { voteType: "up" },
});

commentSchema.virtual("downVoteCount", {
    ref: "CommentVote",
    localField: "_id",
    foreignField: "commentId",
    count: true,
    match: { voteType: "down" },
});

commentSchema.virtual("repliesCount", {
    ref: "Comment", // The model to use
    localField: "_id", // Find people where `localField`
    foreignField: "commentId", // is equal to `foreignField`
    count: true, // And only get the number of docs
});

commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "commentId",
});

commentSchema.set("toObject", { virtuals: true });

commentSchema.set("toJSON", { virtuals: true });

commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Comment", commentSchema);
