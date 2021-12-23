var express = require('express');
var router = express.Router();

var EventVote = require('./vote.model').EventVote;
var PostVote = require('./vote.model').PostVote;
var CommentVote = require('./vote.model').CommentVote;
var ReplyVote = require('./vote.model').ReplyVote;
var auth = require('../../../../../middleware/auth');
var Post = require('../../../../../src/model/user/post/postSchema');
const Comment = require('../comment_section/comment/comment.model');
const Event = require('../../../../../src/model/user/events/eventSchema');

router.route('/event/up').put(auth, likeEvent);
router.route('/event/down').put(auth, dislikeEvent);

router.route('/post').post(auth, createPostVote);
router.route('/comment/up').put(auth, likeComment);
router.route('/comment/down').put(auth, dislikeComment);
router.route('/reply').post(auth, createReplyVote);


async function createReplyVote(req, res) {
    if(!req.body.replyId) {
        throw new Error("replyId is must");
    }
    let replyVote = await ReplyVote.findOne({userId: req.user.ID, replyId: req.body.replyId});
    if(replyVote) {
        ReplyVote.findOneAndUpdate({_id: replyVote._id}, req.body, {upsert: false, new: true})
        .then(vote => {
            res.status(204).json({status: true, data: vote, message:'Update successfully'});
        })
    } else {
        let rv = new ReplyVote(req.body);
        rv.userId = req.user.ID;
        rv.save().then(vote =>{
            res.status(201).json({data: vote, status: true, message: 'Created Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }

            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

async function createCommentVote(req, res) {
    if(!req.body.commentId) {
        throw new Error("commentId is must");
    }
    let commentVote = await CommentVote.findOne({userId: req.user.ID, commentId: req.body.commentId});
    console.log(commentVote);
    if(commentVote) {
        commentVote.voteType = commentVote.voteType == 'up' ? 'down' : 'up';
        commentVote.save().then(vote => {
            let val = vote.voteType == 'up' ? 1 : -1;
            incOrDecLikes(commentVote._id, val);
            res.status(200).json({status: true, data: vote, message:'Update successfully'});
        })
    } else {
        let cv = new CommentVote(req.body);
        cv.userId = req.user.ID;
        cv.save().then(vote =>{
            let newval = vote.voteType == 'up' ? 1 : -1;
            incOrDecLikes(commentVote._id, newval);
            res.status(201).json({data: vote, status: true, message: 'Created Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }

            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

async function likeEvent(req, res) {
    if(!req.query.ID) {
        throw new Error("event Id is must");
    }
    
    let eventVote = await EventVote.findOne({userId: req.user.ID, eventId: req.query.ID});
    if(eventVote) {
        if(eventVote.voteType == 'down') {
            // increment event.totalLikes
            await incOrDecEventTotalLikes(req.query.ID, 1);
            EventVote.findOneAndUpdate({userId: req.user.ID, eventId: req.query.ID}, {voteType: 'up'}, {upsert: false, new: true})
            .then(data => res.status(200).json({status: true, message: 'liked successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        } else {
            //decerement event total likes
            await incOrDecEventTotalLikes(req.query.ID, -1);
            EventVote.findOneAndDelete({userId: req.user.ID, eventId: req.query.ID})
            .then(data => res.status(200).json({status: true, message: 'unliked successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        }
        
    } else {
        // increment event.totalLikes
        let inc = await incOrDecEventTotalLikes(req.query.ID, 1)
        let ev = new EventVote({
            eventId: req.query.ID,
            voteType: 'up',
            userId: req.user.ID
        });
        ev.save().then(vote =>{
            res.status(201).json({data: vote, status: true, message: 'Liked Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

async function dislikeEvent(req, res) {
    if(!req.query.ID) {
        throw new Error("eventId is must");
    }
    
    let eventVote = await EventVote.findOne({userId: req.user.ID, eventId: req.query.ID});
    if(eventVote) {
        if(eventVote.voteType == 'up') {
            // decrement event.totalLikes
            let dec = await incOrDecEventTotalLikes(req.query.ID, -1);

            EventVote.findOneAndUpdate({userId: req.user.ID, eventId: req.query.ID}, {voteType: 'down'}, {upsert: false, new: true})
            .then(data => res.status(200).json({status: true, message: 'unliked successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        
        } else {
            let dec = await incOrDecEventTotalLikes(req.query.ID, 1);
            let remove = await incOrDecPost(req.query.ID, -1);
            EventVote.findOneAndDelete({userId: req.user.ID, eventId: req.query.ID})
            .then(data => res.status(200).json({status: true, message: 'removed successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        }
        
    } else {
        // increment event.totalLikes
        let inc = await incOrDecEventTotalLikes(req.query.ID, 1)
        let ev = new EventVote({
            eventId: req.query.ID,
            voteType: 'down',
            userId: req.user.ID
        });
        ev.save().then(vote =>{
            res.status(201).json({data: vote, status: true, message: 'Created Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

async function likeComment(req, res) {
    if(!req.query.ID) {
        throw new Error("comment ID is must");
    }
    
    let commentVote = await CommentVote.findOne({userId: req.user.ID, commentId: req.query.ID});
    if(commentVote) {
        if(commentVote.voteType == 'down') {
            // decrement event.totalLikes
            await incOrDecCommentTotalLikes(req.query.ID, 1);
            CommentVote.findOneAndUpdate({userId: req.user.ID, commentId: req.query.ID}, {voteType: 'up'}, {upsert: false, new: true})
            .then(data => res.status(200).json({status: true, message: 'unliked successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        } else {
            await incOrDecCommentTotalLikes(req.query.ID, -1);
            CommentVote.findOneAndDelete({userId: req.user.ID, commentId: req.query.ID})
            .then(data => res.status(200).json({status: true, message: 'liked successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        }
        
    } else {
        // increment event.totalLikes
        await incOrDecCommentTotalLikes(req.query.ID, 1)
        let ev = new CommentVote({
            commentId: req.query.ID,
            voteType: 'up',
            userId: req.user.ID
        });
        ev.save().then(vote =>{
            res.status(201).json({data: vote, status: true, message: 'Created Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

async function dislikeComment(req, res) {
    if(!req.query.ID) {
        throw new Error("comment ID is must");
    }
    
    let eventVote = await CommentVote.findOne({userId: req.user.ID, commentId: req.query.ID});
    if(eventVote) {
        if(eventVote.voteType == 'up') {
            // decrement event.totalLikes
            await incOrDecCommentTotalLikes(req.query.ID, -1);

            CommentVote.findOneAndUpdate({userId: req.user.ID, commentId: req.query.ID}, {voteType: 'down'}, {upsert: false, new: true})
            .then(data => res.status(200).json({status: true, message: 'unliked successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        
        } else {
            await incOrDecCommentTotalLikes(req.query.ID, -1);
            CommentVote.findOneAndDelete({userId: req.user.ID, commentId: req.query.ID})
            .then(data => res.status(200).json({status: true, message: 'unliked successfully'}))
            .catch(error => res.status(500).json({status: false, message: error.message}))
        }
        
    } else {
        // increment event.totalLikes
        // let inc = await incOrDecEventTotalLikes(req.query.ID, 1)
        let ev = new CommentVote({
            commentId: req.query.ID,
            voteType: 'down',
            userId: req.user.ID
        });
        await incOrDecCommentTotalLikes(req.query.ID, -1);
        ev.save().then(vote =>{
            res.status(201).json({data: vote, status: true, message: 'disliked Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

async function createEventVote(req, res) {
    if(!req.body.eventId) {
        throw new Error("eventId is must");
    }

    // let incre = incOrDecPostVotes(req.body.postId, 1);
    // console.log(incre.totalVotes);
    
    let eventVote = await EventVote.findOne({userId: req.user.ID, commentId: req.body.commentId});
    if(eventVote) {
        eventVote.findOneAndUpdate({_id: eventVote._id}, req.body, {upsert: false, new: true})
        .then(vote => {
            res.status(200).json({status: true, data: vote, message:'Update successfully'});
        })
    } else {
        let ev = new EventVote(req.body);
        ev.userId = req.user.ID
        ev.save().then(vote =>{
            res.status(201).json({data: vote, status: true, message: 'Created Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

async function createPostVote(req, res) {
    if(!req.body.postId) {
        throw new Error("postId is must");
    }

    let incre = incOrDecPostVotes(req.body.postId, 1);
    
    let postVote = await PostVote.findOne({userId: req.user.ID, commentId: req.body.commentId});
    if(postVote) {
        PostVote.findOneAndUpdate({_id: postVote._id}, req.body, {upsert: false, new: true})
        .then(vote => {
            res.status(200).json({status: true, data: vote, message:'Update successfully'});
        })
    } else {
        let pv = new PostVote(req.body);
        pv.userId = req.user.ID
        pv.save().then(vote =>{
            res.status(201).json({data: vote, status: true, message: 'Created Successfully'});
        })
        .catch(error =>{
            let statusCode = 500;
            if(error.name == 'ValidationError') {
                statusCode = 422;
            }
            res.status(statusCode).json({
                status: false, 
                message: error.message
            })
        })
    }
}

function incOrDecLikes(comID, val) {
    return Comment.findOneAndUpdate({ _id: comID }, { $inc: { likes: val } }, { upsert: false });
}


function incOrDecPostVotes(postID, val) {
    return Post.findOneAndUpdate({ _id: postID }, { $inc: { likes: val } }, { upsert: false });
}

function incOrDecEventTotalLikes(eventID, val) {
    return Event.findOneAndUpdate({_id: eventID}, {$inc: { totalLikes: val} }, {upsert: false, new: true});
}

function incOrDecCommentTotalLikes(commentID, val) {
    console.log("comment vote ", val);
    return Comment.findOneAndUpdate({ _id: commentID }, { $inc: { likes: val } }, { upsert: false });
}

module.exports = router;