const express = require("express");
const router = express.Router();
const checkSaved = require("../../../../../middleware/post/saved/checkSaved");
const alreadySaved = require("../../../../../middleware/post/saved/checkkAlreadySaved");
const {
    checkPost, getCommunityUserList,
} = require("../../../generalModules/communityGeneralOperations");
const { isSaved } = require("../../../generalModules/postGeneralOperations");
const { validateID } = require("../../../generalModules/general");
const User = require("../../../../../src/model/user/userSchema");
const knowledgeSchema = require('../../../../../src/model/knowledgeGroup/knowledgeGroup');
const auth = require("../../../../../middleware/auth");
const { PostVote } = require("../votes/vote.model");
const KnowledgeGroup = require("../../../../../src/model/knowledgeGroup/knowledgeGroup");
const Post = require('../../../../../src/model/user/post/postSchema');

const Vote = require('../votes/vote.model').PostVote;

router.post("/save", async (req, res) => {
    if (validateID(req.query.ID)) {
        console.log('invalid ID');
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }


    postExist = await checkPost(req.query.ID);
    if (!postExist || postExist === null) {
        return res
            .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
            .json({
                error: CONSTANTS.BAD_REQUEST,
                message: CONSTANTS.INVALID_POST_ID,
            })
            .end();
    }

    savedPost = await isSaved(req.query.ID, req.user.ID);
    if (savedPost === null) {
        User.updateOne(
            { _id: req.user.ID },
            {
                $addToSet: {
                    savedPosts: [req.query.ID],
                },
            }
        )
            .then((result) => {
                if (result === null) {
                    return res
                        .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.NOT_EXIST,
                        })
                        .end();
                }

                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.POST_SAVED_SUCCESSFULLY,
                    })
                    .end();
            })
            .catch((err) => {
                if (err) {
                    return res
                        .status(
                            CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE
                        )
                        .json({
                            error: CONSTANTS.INTERNAL_ERROR,
                            message: err.message,
                        })
                        .end();
                }
            });
    } else {
        User.updateOne(
            { _id: req.user.ID },
            {
                $pull: {
                    savedPosts: { $in: [req.query.ID] },
                },
            }
        )
            .then((result) => {
                if (result === null) {
                    return res
                        .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.NOT_EXIST,
                        })
                        .end();
                }

                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.POST_UNSAVED_SUCCESSFULLY,
                    })
                    .end();
            })
            .catch((err) => {
                if (err) {
                    return res
                        .status(
                            CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE
                        )
                        .json({
                            error: CONSTANTS.INTERNAL_ERROR,
                            message: err.message,
                        })
                        .end();
                }
            });
    }
});

router.get('/get/saved', async (req, res) => {
    try {

    let user = await User.findOne({_id: req.user.ID}, "savedPosts joinedCommunities");
        let savedPosts = user.savedPosts;
        
        let communities = await KnowledgeGroup.find({}).distinct('_id');
    
        let userJoinedCommunities = _.intersection(user.joinedCommunities.map(e => {return e.toString()}), communities.map(e => {return e.toString()}));
        
        let query = {_id: {$in: savedPosts} , knowledgeGroup: { $in: userJoinedCommunities} };
        let result = await getPost(query, req.query.page);
    
        result.docs = await Promise.all(
            _.map(result.docs, async function(post){
                if(post) {
                    post.isSaved = true;
                    let likeStatus = await getLikeStatus(req.user.ID, post._id);
                    post.isLiked = likeStatus == null ? false : likeStatus.voteType == 'up' ? true: false;
                    post.isDisLiked = likeStatus == null ? false : likeStatus.voteType == 'down' ? true: false;
                    post.totalLikes = post.totalVotes;
                    post.comments = [];
                    delete post.upVoteCount;
                    delete post.downVoteCount;
                }            
            return post;
        })
        )
        res.json({status: true, data: result, message: 'News Feed'});    
    } catch (error) {
        console.log(error);
        res.status(500).json({status: false, message: error.message});
    }
})

function getLikeStatus(userID, postID){
    return Vote.findOne({userId: userID, postId: postID});
}

function getPost(query, __page) {
    let options = {
        page: __page > 0 ? __page: 1 || 1,
        populate: [
            {
                path: 'knowledgeGroup' , select: 'name logo slug moderators'
            }, {
                path: 'upVoteCount'
            }, {
                path: 'downVoteCount'
            },{
                path: 'author', select: 'userName userImage'
            }
        ],
        lean: true,
        sort:{
            createdAt: -1
        }
    }
    return  Post.paginate(query, options);
}
module.exports = router;
