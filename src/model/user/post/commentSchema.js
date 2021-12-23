var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);//to validate mongoose object id _id
const LikeDislike = {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
}
const duplicate = {
    posted: {
        type: Date,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    replies: []
};

const commentSchema = mongoose.Schema({
    discussion_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [LikeDislike],
    disLikes: [LikeDislike],
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

commentSchema.plugin(mongoosePaginate);

commentSchema.methods.validatePost = (comment) => {
    const schema = {
        discussion_id: Joi.objectid().required(),
        parent_id: Joi.string().optional(),
        text: Joi.string().optional(),
    }
    return Joi.validate(comment, schema);
};
module.exports = mongoose.model('Comment', commentSchema);