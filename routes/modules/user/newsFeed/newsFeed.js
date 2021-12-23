const express = require("express");
const router = express.Router();
const {
    checkCommunityModerator,
} = require("../../generalModules/communityGeneralOperations");
const {
    getCommunities
} = require("../../generalModules/userGeneralOperations");
const {
    isLiked,
    isDisLiked,
} = require("../../generalModules/postGeneralOperations");
const {getCommunityUserList}  = require('../../../../routes/modules/generalModules/communityGeneralOperations');
const Post = require("../../../../src/model/user/post/postSchema");
const categorySchema = require("../../../../src/model/category/category");
const knowledgeSchema = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
const { isValidObjectId } = require("mongoose");
const auth = require("../../../../middleware/auth");
//get user all post

function filterCommunities(users, availables) {
    let temp = [];
    for(let i = 0; i<users.length; i++) {
        for(let j=0; j<availables.length; j++) {
            if(users[i].equals(availables[j])){
                availables.splice(j, 1);
                temp.push(users[i]);
                break;
            }
        }
    }
    return temp;
}
router.get("/get", auth,  async (req, res) => {
    let page = 1;
    // (req.query.page > 0) ? req.query.page : 1;
    let archivedCommunities = await knowledgeSchema.find({isArchived: true}).distinct('_id');
    let availableCommunities = await knowledgeSchema.find({isArchived: false}).distinct('_id');

    let userSavedPosts = await User.findOne({_id: req.user.ID}, 'savedPosts joinedCommunities');
    // let communities = await getCommunities(req.user.ID);
    let userJoinedCommunities = filterCommunities(userSavedPosts.joinedCommunities, availableCommunities);
    
    //getCommunities
    var query;
    if(req.user.role == 'Admin') {
        query = {
            isPublished: true,
            knowledgeGroup: {$nin: archivedCommunities, $in: availableCommunities}
        }
    } else {
        query = {
            knowledgeGroup: { $in: userJoinedCommunities, $nin: archivedCommunities},
            isPublished: true,
        };
    }
    
    var options = {
        sort: { createdAt: -1 },
        populate: [
            { path: "category", model: categorySchema },
            {
                path: "knowledgeGroup",
                select: { _id: 1, name: 1, slug: 1 , logo: 1},
            },
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 20,
    };
    Post.paginate(query, options)
        .then(async function (result) {
            let attributes = _.pick(result, [
                "totalDocs",
                "limit",
                "totalPages",
                "page",
                "pagingCounter",
                "hasPrevPage",
                "hasNextPage",
                "prevPage",
                "nextPage",
            ]);
            attributes["docs"] = await Promise.all(
                _.map(result.docs, async function (object) {
                    if (object.knowledgeGroup != null) {
                        let moderator = await checkCommunityModerator(
                            req.user.ID,
                            object.knowledgeGroup._id
                        );
                        (await moderator) === null
                            ? Object.assign(object, { isModerator: false })
                            : Object.assign(object, { isModerator: true });
                    }
                    let isSaved = userSavedPosts.savedPosts.indexOf(object._id) == -1 ? false : true;
                    let liked = object.likes.indexOf(req.user.ID) == -1 ? false : true;
                    let disLiked = object.disLikes.indexOf(req.user.ID) == -1 ? false : true;
                    let users = [];
                    if(object.knowledgeGroup){
                        users = await getCommunityUserList(object.knowledgeGroup._id);
                        Object.assign(object.knowledgeGroup, {members: users ? users.length: 0});
                    }
                    
                    Object.assign(object, {isLiked: liked, isDisliked: disLiked, isSaved: isSaved});
                    return object;
                })
            );
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.USER_NEWS_FEED,
                    data: attributes,
                })
                .end();
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = router;
