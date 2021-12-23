const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const {
    isLiked,
    isDisLiked,
} = require("../../generalModules/postGeneralOperations");
const {
    checkCommunityAdmin,
    checkCommunityModerator,
    checkCommunityPostAuthor,
    checkPost,
} = require("../../generalModules/communityGeneralOperations");
const Post = require("../../../../src/model/user/post/postSchema");
const categorySchema = require("../../../../src/model/category/category");
const knowledgeSchema = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
//get post detail by slug
router.get("/get", async (req, res) => {
    const token = req.header('x-auth-token');
    let _user;
    let userID = null;
    let joinedCommunities = [];
    let savedPosts = [];
    if(token) {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        _user = await User.findOne({_id: decoded.ID}, 'savedPosts joinedCommunities');
        userID = _user._id;
        joinedCommunities = _user.joinedCommunities || [];
        savedPosts = _user.savedPosts || [];
    }

    if (!req.query.id) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.ID_IS_REQUIRED,
            })
            .end();
    }
     
    Post.findById(req.query.id)
        .populate([
            {
                path: "knowledgeGroup",
                model: knowledgeSchema,
                select: { _id: 1, name: 1, logo: 1, slug: 1, moderators:1 },
            },
            { path: "author", model: User, select: { _id: 1, userName: 1, userImage: 1 } },
        ])
        .lean(true)
        .then(async function (result) {
            let counts = await User.countDocuments({joinedCommunities: {$in: [result.knowledgeGroup._id]}})
            result.knowledgeGroup.members = counts;
            
            result.isSaved = savedPosts.indexOf(result._id) == -1 ? false : true;
            result.isJoined = joinedCommunities.indexOf(result.knowledgeGroup._id) == -1 ? false : true;
            result.isComMod = result.knowledgeGroup.moderators.map(itm => {return itm.toString()}).indexOf(userID+"") == -1 ? false : true;
            
            res.status(200).json({
                status: true, message: 'found detail', data: result
            })
        })
        .catch(error => res.status(500).json({
            status: false, message: error.message
        }))
    });


module.exports = router;
