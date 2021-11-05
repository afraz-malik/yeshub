const express = require("express");
const router = express.Router();
const Vote = require('../post/votes/vote.model').PostVote;
const Post = require("../../../../src/model/user/post/postSchema");
const { validateID } = require("../../generalModules/general");
const { isDisLiked } = require("../../generalModules/postGeneralOperations");
const {
    PostLikeDislikelogIt,
} = require("../../events/post/likedDislike/likeDislikeListener");
const isVerified = require("../../../../middleware/isVerified");

router.put("/Dislike", isVerified, async (req, res) => {
    //validating ID
    if (validateID(req.query.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    let likeStatus = await Vote.findOne({userId: req.user.ID, postId: req.query.ID});
    if (likeStatus == null) {
        let add = await incOrDecPost(req.query.ID, 1);
        let vote = new Vote({userId: req.user.ID, postId: req.query.ID, voteType: 'down'});
        vote.save().then(vote => res.status(200).json({status: true, message: 'liked successfully'}))
        .catch(error => res.status(500).json({status: false, message: error.message}))
    } else {
        let remove = await incOrDecPost(req.query.ID, -1);
        Vote.findOneAndDelete({userId: req.user.ID, postId: req.query.ID})
        .then(data => res.status(200).json({status: true, message: 'unlike successfully'}))
        .catch(error => res.status(500).json({status: false, message: error.message}))
    }
});

function incOrDecPost(postID, val) {
    return Post.findOneAndUpdate({ _id: postID }, { $inc: { totalVotes: val } }, { upsert: false });
}

module.exports = router;
