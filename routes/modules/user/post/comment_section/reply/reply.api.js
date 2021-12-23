var express = require('express');

var router = express.Router();

var Reply = require('./reply.model');

var auth = require('../../../../../../middleware/auth');
var Post = require('../../../../../../src/model/user/post/postSchema');

const { result } = require('lodash');

router.route('/to/comment').post(auth, createToComment);
router.route('/to/reply').post(auth, createToReply);
router.route('/bycomment/:id').get(auth, get_by_comment);
router.route('/byreply/:id').get(auth, get_by_reply);

async function createToComment(req, res) {
    if (!req.body.postId || !req.body.commentId) {
        throw new Error("Both postId and commentId is required");
    }

    try {

        let increm = await incOrDecPost(req.body.postId, 1);


        let reply = new Reply({
            commentId: req.body.commentId,
            body: req.body.body
        });

        reply.userId = req.user.ID;
        reply.save()
            .then(reply => {
                Reply.populate(reply, [
                    { path: 'upVoteCount' },
                    { path: 'downVoteCount' },
                    { path: 'replies' },
                    { path: 'repliesCount' },
                    { path: 'userId', select: 'userName userImage' }
                ], function (err, doc) {
                    if (err) {
                        throw err;
                    }
                    res.status(201).json({ status: true, body: doc, message: 'Replied successfully' });
                })

            })
            .catch(error => {

                let statusCode = 500;
                if (error.name === "ValidationError") {
                    statusCode = 422;
                }
                res.status(statusCode).json({ message: error.message, status: false });
            })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

}

async function createToReply(req, res) {
    if (!req.body.postId || !req.body.replyId) {
        throw new Error("Both of them, postId and replyId is required");
    }

    try {
        let reply = new Reply({
            replyId: req.body.replyId,
            body: req.body.body
        });
        reply.userId = req.user.ID;
        reply.save()
            .then(reply => {
                Reply.populate(reply, [
                    { path: 'upVoteCount' },
                    { path: 'downVoteCount' },
                    { path: 'replies' },
                    { path: 'repliesCount' },
                    { path: 'userId', select: 'userName userImage' }
                ], function (err, doc) {
                    if (err) {
                        throw err;
                    }
                    res.status(201).json({ status: true, body: doc, message: 'Replied successfully' });
                })

            })
            .catch(error => {

                let statusCode = 500;
                if (error.name === "ValidationError") {
                    statusCode = 422;
                }
                res.status(statusCode).json({ message: error.message, status: false });
            })

    } catch (error) {

    }

}

/**
 * @param {page} req 
 * @param {*} res 
 */
function get_by_comment(req, res) {
    const options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: 'upVoteCount' },
            { path: 'downVoteCount' },
            { path: 'repliesCount' },
            { path: 'userId', select: 'userName userImage' }
        ]
    }
    Reply.paginate({ commentId: req.params.id }, options)
        .then(result => {
            result.docs.forEach(reply => {
                reply.replies = [];
                reply.vote = reply.upVoteCount - reply.downVoteCount;
            })

            res.status(200).json({
                status: true,
                data: result,
                message: 'Found Replies'
            })
        })
        .catch(error => {
            res.status(500).json({
                status: false,
                message: error.message
            })
        })
}

/**
 * 
 * @param {page} req 
 * @param {*} res 
 */
function get_by_reply(req, res) {
    const options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: 'upVoteCount' },
            { path: 'downVoteCount' },
            { path: 'repliesCount' },
            { path: 'userId', select: 'userName userImage' }
        ]
    }

    Reply.paginate({ replyId: req.params.id }, options)
        .then(replies => {
            replies.docs.map(reply => {
                reply.replies = [];
                reply.vote = reply.upVoteCount - reply.downVoteCount;
            })
            res.status(200).json({
                status: true,
                data: replies,
                message: 'Found Replies'
            })
        })
        .catch(error => {
            res.status(500).json({
                status: false,
                message: error.message
            })
        })
}


function incOrDecPost(postID, val) {
    return Post.findOneAndUpdate({ _id: postID }, { $inc: { totalComments: val } }, { upsert: false });
}


module.exports = router;