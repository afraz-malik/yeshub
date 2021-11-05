var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const commentVoteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: [true, "user id is required"]},
    commentId: {type: Schema.Types.ObjectId, ref: 'Comment', required: [true, "comment id is required"]},
    voteType: {type: String, default: 'up'}
}, {
    timestamps: true,
    id: false,
})
const eventVoteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: [true, "user id is required"]},
    eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: [true, "comment id is required"]},
    voteType: {type: String, default: 'up'}
}, {
    timestamps: true,
    id: false,
})


const replyVoteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: [true, "user id is required"]},
    replyId: {type: Schema.Types.ObjectId, ref: 'Reply', required: [true, "reply id is required"]},
    voteType: {type: String, default: 'up'}
}, {
    timestamps: true,
    id: false,
})



const postVoteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: [true, "user id is required"]},
    postId: {type: Schema.Types.ObjectId, ref: 'Post', required: [true, "post id is required"]},
    voteType: {type: String, default: 'up'}
}, {
    timestamps: true,
    id: false,
})


module.exports = {
    CommentVote: mongoose.model('CommentVote', commentVoteSchema),
    PostVote: mongoose.model('PostVote', postVoteSchema),
    ReplyVote: mongoose.model('ReplyVote', replyVoteSchema),
    EventVote: mongoose.model('EventVote', eventVoteSchema)
}