//User Model
const User = require("../../../src/model/user/userSchema");
const Community = require("../../../src/model/knowledgeGroup/knowledgeGroup");
const Post = require("../../../src/model/user/post/postSchema");

const { deleteCommunitySpecficPost } = require("./postGeneralOperations");
//Find user by email address
async function validateCommunityExist(ID) {
    return await Community.findOne({ _id: ID });
}

//validate community by slug
async function validateCommunityExistBySlug(Slug) {
    return await Community.findOne({ slug: Slug });
}

//Find user by email address
async function checkAlreadyModeratorExist(communityID, userID) {
    return await Community.findOne({
        _id: communityID,
        moderators: { $in: [userID] },
    });
}

//Find user by email address
async function checkForCommunityAdmin(userID) {
    console.log(userID);
    return await User.findOne({
        _id: userID,
        assignedRoles: CONSTANTS.ROLE_ADMIN,
    });
}

//Find user by email address
async function checkForCommunityModerator(userID, knowledgeGroupID) {
    return await Community.findOne({
        _id: knowledgeGroupID,
        moderators: { $in: [userID] },
    });
}

//Find user by email address
async function checkForCommunityPostAuthor(authorID, postID) {
    return await Post.findOne({ _id: postID, author: authorID });
}

//check for post exist or not
async function postExistOrNot(postID) {
    return await Post.findOne({ _id: postID });
}

//check for post exist or not
async function getCompanyModerators(communityID) {
    return await Community.findOne({ _id: communityID }).select({
        moderators: 1,
    });
}

//Get Community Name
async function getCommunityName(ID) {
    return await Community.findOne({ _id: ID }).select({ name: 1 });
}

async function getCommunityPost(ID) {
    return await Post.find({ knowledgeGroup: ID });
}

async function deleteCommunityPosts(communityID) {
    const allPosts = await getCommunityPost(communityID);
    console.log(allPosts);
    if (allPosts) {
        allPosts.forEach(async (post) => {
            await deleteCommunitySpecficPost(post._id);
        });
    }
    await User.updateMany(
        { joinedCommunities: { $in: [communityID] } },
        { $pull: { joinedCommunities: { $in: [communityID] } } }
    );
}

async function getCommunityUserCount(ID) {
    return await User.find({
        joinedCommunities: { $in: [ID] },
    }).countDocuments();
}

async function getCommunityUserList(ID) {
    return await User.find({
        joinedCommunities: { $in: [ID] },
    }).select({ userName: 1, userImage: 1 });
}

function incrementCommunityMember(communityID) {
    Community.findOneAndUpdate(
        { _id: communityID },
        { totalMembers: { $inc: 1 } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            console.log("updated member, ", doc.totalMember);
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function decrementCommunityMember(communityID) {
    Community.findOneAndUpdate(
        { _id: communityID },
        { totalMembers: { $inc: -1 } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            console.log("updated member, ", doc);
        })
        .catch((error) => {
            console.log("--------------- error ---------");
            console.log(error.message);
            console.log("--------------- error ---------");
        });
}

module.exports.decrementCommunityMember = decrementCommunityMember;
module.exports.incrementCommunityMember = incrementCommunityMember;

module.exports.validateCommunity = validateCommunityExist;
module.exports.validateCommunityExistBySlug = validateCommunityExistBySlug;
module.exports.checkAlreadyModerator = checkAlreadyModeratorExist;
module.exports.checkCommunityAdmin = checkForCommunityAdmin;
module.exports.checkCommunityModerator = checkForCommunityModerator;
module.exports.checkCommunityPostAuthor = checkForCommunityPostAuthor;
module.exports.checkPost = postExistOrNot;
module.exports.getModerators = getCompanyModerators;
module.exports.getCommunityName = getCommunityName;
module.exports.deleteCommunityPosts = deleteCommunityPosts;
module.exports.getCommunityUserCount = getCommunityUserCount;
module.exports.getCommunityUserList = getCommunityUserList;
