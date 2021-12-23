var express = require('express');
var router = express.Router();

var EventCommentVote = require('./event-comment-vote.model');
var auth = require('../../../../../middleware/auth');

router.route('/').post(auth, createCommentVote);



async function createCommentVote(req, res) {
    if(!req.body.commentId) {
        throw new Error("commentId is must");
    }

    let commentVote = await EventCommentVote.findOne({userId: req.user.ID, commentId: req.body.commentId});
    
    if(commentVote) {
        commentVote.voteType = commentVote.voteType == 'up' ? 'down' : 'up';
        commentVote.save().then(vote => {
            let val = vote.voteType == 'up' ? 1 : -1;
            // incOrDecLikes(commentVote._id, val);
            res.status(200).json({status: true, data: vote, message:'Update successfully'});
        })
    } else {
        let cv = new CommentVote(req.body);
        cv.userId = req.user.ID;
        cv.save().then(vote =>{
            let newval = vote.voteType == 'up' ? 1 : -1;
            // incOrDecLikes(commentVote._id, newval);
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

module.exports = router;