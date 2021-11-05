//User Model
const User = require("../../../src/model/user/userSchema");
const Post = require("../../../src/model/user/post/postSchema");
// const Comment = require("../../../src/model/user/post/commentSchema");
const Comment = require("../user/post/comment_section/comment/comment.model");

const { deleteCommunitySpecficPost } = require("./postGeneralOperations");
const { deleteImages } = require("./general");

//increment karma points of user generic function
async function incrementPoint(UserID, Point) {
    return await User.updateOne(
        { _id: UserID },
        {
            $inc: {
                points: +Point,
            },
        },
        { new: true }
    );
}

//user progress bar update
async function progressUpdate(object, UserID) {
    return await User.updateOne(
        { _id: UserID },
        {
            $set: object,
        },
        { new: true }
    );
}

//Find user by email address
async function findUserByEmail(email) {
    return await User.findOne({ email: email });
}

//Get UserName
async function getUserName(ID) {
    return await User.findOne({ _id: ID }).select({
        fullName: 1,
        userName: 1,
        muteNotifications: 1,
    });
}

//find user by email and check its already verified or not
async function checkUserAlreadyEmailVerified(email) {
    const user = await User.findOne({ email: email });
    if (user === null) {
        return null;
    }
    if (user.progressBar.email === true) {
        return true;
    } else {
        return false;
    }
}

//find user by email and check its already verified or not
async function checkUserProgressBar(ID) {
    return await User.findOne({ _id: ID });
}

//find user by id and check whether it first time update or not
async function checkUserUpdateFirst(id) {
    const user = await User.findOne({ _id: id });
    if (user === null) {
        return null;
    }

    if (user.progressBar.updateProfile === true) {
        return true;
    } else {
        let result = await validateSectionForNull(id);
        if (result == 0) {
            await incrementPoint(id, CONSTANTS.UPDATE_PROFILE_FIRST_POINT);
            await progressUpdate({ "progressBar.updateProfile": true }, id);
            if (user.muteNotifications) return;
            NOTIFICATION.singleNotifyUser({
                userID: id,
                message:
                    CONSTANTS.UPDATE_PROFILE_FIRST_TEXT +
                    CONSTANTS.UPDATE_PROFILE_FIRST_POINT +
                    CONSTANTS.IS_AWARD_TEXT,
                notificationType: CONSTANTS.IS_AWARD,
            });
            return true;
        }
    }
}

//find user by id and check whether it first time update or not
async function validateSectionForNull(id) {
    const user = await User.findOne({ _id: id });
    if (user === null) {
        return false;
    }
    // console.log(user.metaInfo);
    var moreInfo = Object.keys(user.metaInfo).filter(function (key) {
        return user.metaInfo[key] === null || user.metaInfo[key] === "";
    });
    var otherInfo = Object.keys(user.otherInfo).filter(function (key) {
        return user.otherInfo[key] === null || user.metaInfo[key] === "";
    });
    // console.log(moreInfo.length + otherInfo.length);
    return moreInfo.length + otherInfo.length;
}

//validate UserRole
async function validateUserRole(id) {
    return await User.findOne({
        _id: id,
        assignedRoles: { $in: [CONSTANTS.ROLE_USER, CONSTANTS.ROLE_ADMIN] },
    });
}
//get user joined communities
async function getUserJoinedCommunities(id) {
    return await User.findOne({ _id: id }).select({
        joinedCommunities: 1,
        muteNotifications: 1,
    });
}

//validate UserRole
async function checkCommunityJoined(communityID, userID) {
    return await User.findOne({
        _id: userID,
        joinedCommunities: { $in: [communityID] },
    });
}
//Deactivate user account

async function deactivateAccount(userID) {
    //get user all posts
    let postID = await getUserPostIDs(userID);
    if (postID) {
        postID.forEach(async (element) => {
            await deleteCommunitySpecficPost(element._id);
            deleteImages(element.image);
        });
    }
    await deleteUserAllComments(userID);
    await deleteUserAllLikesFromPost(userID);
    await deleteUserAllDisLikesFromPost(userID);
}
//delete user all posts
async function deleteUserAllPosts(UserID) {
    return await Post.deleteMany({ author: UserID });
}
//delete user all comments
async function deleteUserAllComments(UserID) {
    return await Comment.deleteMany({ author: UserID });
}
//delete user all Like from posts
async function deleteUserAllLikesFromPost(UserID) {
    return await Post.updateMany(
        { likes: { $in: [UserID] } },
        {
            $pull: { likes: { $in: [UserID] } },
        }
    );
}
//delete user all Like from posts
async function deleteUserAllDisLikesFromPost(UserID) {
    return await Post.updateMany(
        { disLikes: { $in: [UserID] } },
        {
            $pull: { disLikes: { $in: [UserID] } },
        }
    );
}
//get user post count
async function getUserAllPost(userID) {
    return await Post.find({ author: userID }).select({
        _id: 1,
        image: 1,
        muteNotifications: 1,
    });
}
//get user post images
async function getUserPostIDs(userID) {
    return await Post.find({ author: userID }).select({
        image: 1,
        muteNotifications: 1,
    });
}
//delete post from all user saved posts
async function deletePostsFromSaveFromAllUsers(ID) {
    return await User.updateMany(
        { savedPosts: { $in: ID } },
        {
            $pull: { savedPosts: { $in: ID } },
        }
    );
}
//deactivate accont ends
module.exports.incrementPoint = incrementPoint;
module.exports.findUserByEmail = findUserByEmail;
module.exports.checkUserAlreadyEmailVerified = checkUserAlreadyEmailVerified;
module.exports.checkUserUpdateFirst = checkUserUpdateFirst;
module.exports.validateUserRole = validateUserRole;
module.exports.getCommunities = getUserJoinedCommunities;
module.exports.checkJoined = checkCommunityJoined;
module.exports.validateSectionForNull = validateSectionForNull;
module.exports.checkUserProgressBar = checkUserProgressBar;
module.exports.progressUpdate = progressUpdate;
module.exports.getUserName = getUserName;
module.exports.deactivateAccount = deactivateAccount;
