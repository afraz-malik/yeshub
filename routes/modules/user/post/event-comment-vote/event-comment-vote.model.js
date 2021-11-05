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


module.export = mongoose.model('EventCommentVote', commentVoteSchema);
