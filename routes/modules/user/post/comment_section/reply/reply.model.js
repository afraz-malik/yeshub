const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate-v2");

let replySchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    postId: {type: Schema.Types.ObjectId, ref: 'Post'},
    commentId: {type: Schema.Types.ObjectId, ref: 'Comment'},
    replyId: {type: Schema.Types.ObjectId, ref: 'Reply'},
    body: {type: String, trim: true, required: [true, "reply could not be empty"]},
    likes: Number,
    dislikes: Number
}, {
    timestamps: true,
    versionKey: false,
    id: false
});


replySchema.virtual('upVoteCount', {
    ref: 'ReplyVote',
    localField: '_id',
    foreignField: 'replyId',
    count: true,
    match: {voteType : 'up'}
})


replySchema.virtual('downVoteCount', {
    ref: 'ReplyVote',
    localField: '_id',
    foreignField: 'replyId',
    count: true,
    match: {voteType : 'down'}
})


replySchema.virtual('repliesCount', {
    ref: 'Reply',
    localField: '_id',
    foreignField: 'replyId',
    count: true
});

replySchema.virtual('replies', {
    ref: 'Reply',
    localField: '_id',
    foreignField: 'replyId'
});

replySchema.set('toObject', { virtuals: true });
replySchema.set('toJSON', { virtuals: true });
replySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Reply', replySchema);