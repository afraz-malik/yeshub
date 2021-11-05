var express = require('express');
var router = express.Router();
var auth = require('../../../../../../middleware/auth');
var Post = require('../../../../../../src/model/user/post/postSchema');
const {
    PostCommentlogIt,
} = require('../../../../events/post/comment/PostcommentListener');
var EventComment = require('./event-comment.model');
const { PostlogIt } = require('../../../../events/post/postEventListener');
const CommentVote = require('../../votes/vote.model').CommentVote;
router.route('/').post(auth, create);
router.route('/bypost/:id').get(auth, get_by_event); // path should be changed


 

async function create(req, res) {
    // let incr = await incOrDecPost(req.body.postId, 1);

    let comment = new EventComment(req.body);
    comment.userId = req.user.ID;
    comment.save()
        .then(comment => {
            EventComment.populate(comment, [
                { path: 'upVoteCount' },
                { path: 'downVoteCount' },
                { path: 'replies' },
                { path: 'userId', select: 'userName userImage' },
                { path: 'repliesCount' }
            ], function (err, doc) {
                if (err) {
                    throw err;
                } else {
                    PostCommentlogIt("comment", {
                        person: req.user.ID,
                        postID: req.body.postId
                    });
                    res.status(201).json({ status: true, body: doc, message: 'Comment Created Successfully' })
                }
            })
        })
        .catch(error => {
            let statusCode = 500;
            if (error.name === 'ValidationError') {
                statusCode = 422;
            }
            res.status(statusCode).json({ status: false, message: error.message });
        })
}

/**
 * 
 * @param {postId, page} req 
 * @param {} res 
 */
function get_by_event(req, res) {
    const cl = {
        limit: 'perPage',
        page: 'currentPge'
    }
    let options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: 'upVoteCount' },
            { path: 'downVoteCount' },
            { path: 'repliesCount' },
            { path: 'userId', select: 'userName userImage' }
        ]
    };
    // Comment.paginate({ postId: req.params.id }, { customLabels: cl, limit: req.body.perPage || 10, page: req.body.currentPage || 1 }).then(data => {
    Comment.paginate({eventId: req.params.id }, options).then(async (comments) => {
        let result = await Promise.all(
            _.map(comments.docs, async function(comment){
                comment.replies = [];
                comment.vote = comment.upVoteCount - comment.downVoteCount;
                
                let likeStatus = await isVoted(comment.post.postId, req.user.ID);
                
                if(likeStatus) {
                    comment.isLiked = likeStatus.voteType == 'up' ? true: false;
                    comment.isDisLiked = likeStatus.voteType == 'down' ? true: false;
                } else {
                    comment.isLiked = false;
                    comment.isDisLiked = false;
                }

                return comment;
            })
        );
        comments.docs  = result;
        res.status(200).json({ status: true, body: comments })
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }));
}



function incOrDecPost(postID, val) {
    return Post.findOneAndUpdate({ _id: postID }, { $inc: { totalComments: val } }, { upsert: false });
}


function isVoted(userId, commentId) {
    return CommentVote.findOne({commentId: commentId, userId: userId});
}

module.exports = router;