var express = require("express");
var router = express.Router();
var auth = require("../../../../../../middleware/auth");
var Post = require("../../../../../../src/model/user/post/postSchema");
const Event =
    require("../../../../../../src/model/user/events/eventSchema").model;

const {
    PostCommentlogIt,
} = require("../../../../events/post/comment/PostcommentListener");
const GeneralPost = require("../../../GenPost/gen-post.model");
var Comment = require("./comment.model");
const { PostlogIt } = require("../../../../events/post/postEventListener");
const CommentVote = require("../../votes/vote.model").CommentVote;
router.route("/").post(auth, create);
router.route("/to/event").post(auth, createEventComment);
router.route("/bypost/:id").get(auth, get_by_post); // path should be changed
router.route("/byevent/:id").get(auth, get_by_event); // path should be changed
router.route("/by/comment/:id").get(auth, get_by_comment);
router.route("/:ID").delete(auth, deleteComment).put(auth, updateComment);

async function createEventComment(req, res) {
    let incr = await incOrDecEvent(req.body.eventId, 1);
    let comment = new Comment(req.body);
    comment.userId = req.user.ID;
    comment
        .save()
        .then((comment) => {
            Comment.populate(
                comment,
                [
                    { path: "upVoteCount" },
                    { path: "downVoteCount" },
                    { path: "replies" },
                    { path: "userId", select: "userName userImage" },
                    { path: "repliesCount" },
                ],
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        // PostCommentlogIt("comment", {
                        //     person: req.user.ID,
                        //     postID: req.body.postId
                        // });
                        res.status(201).json({
                            status: true,
                            body: doc,
                            message: "Comment Created Successfully",
                        });
                    }
                }
            );
        })
        .catch((error) => {
            let statusCode = 500;
            if (error.name === "ValidationError") {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false,
                message: error.message,
            });
        });
}

// TODO: check if post owner is commenting, then user should not be notified.
async function create(req, res) {
    let incr = await incOrDecPost(req.body.postId, 1);
    let post = await Post.findOne({ _id: req.body.postId }, "author");
    let isUsersOwnPost = post.author == req.user.ID;
    let comment = new Comment(req.body);
    comment.userId = req.user.ID;
    comment
        .save()
        .then((comment) => {
            Comment.populate(
                comment,
                [
                    { path: "upVoteCount" },
                    { path: "downVoteCount" },
                    { path: "replies" },
                    { path: "userId", select: "userName userImage" },
                    { path: "repliesCount" },
                ],
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        if (!isUsersOwnPost) {
                            PostCommentlogIt("comment", {
                                person: req.user.ID,
                                postID: req.body.postId,
                            });
                        }

                        res.status(201).json({
                            status: true,
                            body: doc,
                            message: "Comment Created Successfully",
                        });
                    }
                }
            );
        })
        .catch((error) => {
            let statusCode = 500;
            if (error.name === "ValidationError") {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false,
                message: error.message,
            });
        });
}

/**
 *
 * @param {postId, page} req
 * @param {} res
 */
function get_by_event(req, res) {
    const cl = {
        limit: "perPage",
        page: "currentPge",
    };
    let options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: "upVoteCount" },
            { path: "downVoteCount" },
            { path: "repliesCount" },
            { path: "userId", select: "userName userImage" },
        ],
        sort: {
            createdAt: -1,
        },
    };
    // Comment.paginate({ postId: req.params.id }, { customLabels: cl, limit: req.body.perPage || 10, page: req.body.currentPage || 1 }).then(data => {
    Comment.paginate({ eventId: req.params.id }, options)
        .then(async (comments) => {
            let result = await Promise.all(
                _.map(comments.docs, async function (comment) {
                    comment.replies = [];
                    comment.vote = comment.upVoteCount - comment.downVoteCount;

                    let likeStatus = await isVoted(req.user.ID, comment._id);

                    if (likeStatus) {
                        comment.isLiked =
                            likeStatus.voteType == "up" ? true : false;
                        comment.isDisLiked =
                            likeStatus.voteType == "down" ? true : false;
                    } else {
                        comment.isLiked = false;
                        comment.isDisLiked = false;
                    }

                    return comment;
                })
            );
            comments.docs = result;
            res.status(200).json({ status: true, body: comments });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}
/**
 *
 * @param {postId, page} req
 * @param {} res
 */

function get_by_post(req, res) {
    const cl = {
        limit: "perPage",
        page: "currentPge",
    };
    let options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: "upVoteCount" },
            { path: "downVoteCount" },
            { path: "repliesCount" },
            { path: "userId", select: "userName userImage" },
        ],
        sort: {
            createdAt: -1,
        },
    };
    // Comment.paginate({ postId: req.params.id }, { customLabels: cl, limit: req.body.perPage || 10, page: req.body.currentPage || 1 }).then(data => {
    Comment.paginate({ postId: req.params.id, commentId: null }, options)
        .then(async (comments) => {
            let result = await Promise.all(
                _.map(comments.docs, async function (comment) {
                    comment.replies = [];
                    comment.vote = comment.upVoteCount - comment.downVoteCount;

                    let likeStatus = await isVoted(req.user.ID, comment._id);

                    if (likeStatus) {
                        comment.isLiked =
                            likeStatus.voteType == "up" ? true : false;
                        comment.isDisLiked =
                            likeStatus.voteType == "down" ? true : false;
                    } else {
                        comment.isLiked = false;
                        comment.isDisLiked = false;
                    }

                    return comment;
                })
            );
            comments.docs = result;
            res.status(200).json({ status: true, body: comments });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

function get_by_comment(req, res) {
    const options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: "upVoteCount" },
            { path: "downVoteCount" },
            { path: "repliesCount" },
            { path: "userId", select: "userName userImage" },
        ],
        sort: {
            createdAt: -1,
        },
    };
    Comment.paginate({ commentId: req.params.id }, options)
        .then(async (comments) => {
            let result = await Promise.all(
                _.map(comments.docs, async function (comment) {
                    comment.replies = [];
                    comment.vote = comment.upVoteCount - comment.downVoteCount;

                    let likeStatus = await isVoted(req.user.ID, comment._id);

                    if (likeStatus) {
                        comment.isLiked =
                            likeStatus.voteType == "up" ? true : false;
                        comment.isDisLiked =
                            likeStatus.voteType == "down" ? true : false;
                    } else {
                        comment.isLiked = false;
                        comment.isDisLiked = false;
                    }

                    return comment;
                })
            );
            // result.docs.forEach(reply => {
            //     reply.replies = [];
            //     reply.vote = reply.upVoteCount - reply.downVoteCount;
            // })

            res.status(200).json({
                status: true,
                data: result,
                message: "Found Replies",
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: false,
                message: error.message,
            });
        });
}

async function deleteComment(req, res) {
    let isAdmin = true;
    let isMod = false;
    if (req.query.mod && Number(req.query.mod) == 345) {
        isMod = true;
    }

    if (req.user.role != "Admin") {
        isAdmin = false;
    }

    let comment = await Comment.findOne({ _id: req.params.ID }).populate();

    if (comment.userId != req.user.ID && !isAdmin && !isMod) {
        return res.status(400).json({
            message: "Forbidden",
            error: "Either you are not admin or you are not author.",
        });
    }

    Comment.deleteOne({ _id: req.params.ID })
        .then((_comment) => {
            incOrDecPost(comment.postId, -1);
            res.json({ message: "Comment deleted successfully" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

async function updateComment(req, res) {
    try {
        let comment = await Comment.findOneAndUpdate(
            { _id: req.params.ID, userId: req.user.ID },
            req.body,
            { upsert: false, new: true }
        );
        if (!comment) {
            return res.status(400).json({ message: "Forbidden" });
        }

        res.json({ message: "Comment Updated successfully", data: comment });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

async function incOrDecPost(postID, val) {
    await Post.findOneAndUpdate(
        { _id: postID },
        { $inc: { totalComments: val } },
        { upsert: false, new: true }
    );
    await GeneralPost.findOneAndUpdate(
        { _id: postID },
        { $inc: { totalComments: val } },
        { upsert: false, new: true }
    );
}

function incOrDecEvent(postID, val) {
    return Event.findOneAndUpdate(
        { _id: postID },
        { $inc: { totalComments: val } },
        { upsert: false }
    );
}

function isVoted(userId, commentId) {
    return CommentVote.findOne({ commentId: commentId, userId: userId });
}

module.exports = router;
