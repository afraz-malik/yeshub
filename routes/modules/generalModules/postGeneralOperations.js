const Post = require("../../../src/model/user/post/postSchema");
// const Comment = require("../../../src/model/user/post/commentSchema");
const Comment = require("../user/post/comment_section/comment/comment.model");
const User = require("../../../src/model/user/userSchema");
const { deleteImages } = require("./general");

//Find user by email address
async function isLiked(postID, userID) {
    return await Post.findOne({ _id: postID, likes: { $in: [userID] } });
}
async function isDisLiked(postID, userID) {
    return await Post.findOne({ _id: postID, disLikes: { $in: [userID] } });
}

async function isSaved(postID, userID) {
    return await User.findOne({ _id: userID, savedPosts: { $in: [postID] } });
}

//get user post count
async function getUserPostCount(userID) {
    const result = await Post.find({ author: userID });
    // console.log(result);
    return result.length;
}

async function getUsercommentPost(userID) {
    const result = await Comment.find({ author: userID }).select({
        discussion_id: 1,
    });
    let post = result.map((comment) => {
        return comment.discussion_id;
    });
    return post;
}

//Get Post Title
async function getPostTitle(ID) {
    return await Post.findOne({ _id: ID }).select({ title: 1 });
}

//delete post from all user saved posts
async function deletePostFromSaveFromAllUsers(ID) {
    return await User.updateMany(
        { savedPosts: { $in: [ID] } },
        {
            $pull: { savedPosts: { $in: [ID] } },
        }
    );
}

//delete post from all user saved posts
async function deleteAllPostComments(ID) {
    let result = await Comment.deleteMany({ discussion_id: ID });
    // console.log(result);
    return result;
}
//delete post from all user saved posts
async function deletePost(ID) {
    return await Comment.deleteOne({ _id: ID });
}

async function deleteCommunitySpecficPost(PostID) {
    await deletePostFromSaveFromAllUsers(PostID);
    await deleteAllPostComments(PostID);
    await deletePostImages(PostID);
    await deletePost(PostID);
}

async function getPostAuthorID(PostID) {
    return await Post.findOne({ _id: PostID }).select({
        author: 1,
    });
}

async function deletePostImages(PostID) {
    const images = await Post.findOne({ _id: PostID }).select({ image: 1 });
    if (images) {
        deleteImages(images);
    }
}

module.exports.isLiked = isLiked;
module.exports.isDisLiked = isDisLiked;
module.exports.getUserPostCount = getUserPostCount;
module.exports.getUsercommentPost = getUsercommentPost;
module.exports.getPostTitle = getPostTitle;
module.exports.isSaved = isSaved;
module.exports.deleteSaveIfPostDelete = deletePostFromSaveFromAllUsers;
module.exports.deleteAllPostComments = deleteAllPostComments;
module.exports.deleteCommunitySpecficPost = deleteCommunitySpecficPost;
module.exports.getPostAuthorID = getPostAuthorID;
