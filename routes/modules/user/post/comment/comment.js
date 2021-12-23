const express = require("express");
const router = express.Router();
const Post = require("../../../../../src/model/user/post/postSchema");
const Comment = require("../../../../../src/model/user/post/commentSchema");
const User = require("../../../../../src/model/user/userSchema");
const { slug } = require("../../../generalModules/general");
const {
    PostCommentlogIt,
} = require("../../../events/post/comment/PostcommentListener");
const comment = new Comment();
const isVerified = require("../../../../../middleware/isVerified");

router.get("/getAll", async (req, res) => {
    var query = { discussion_id: "5e5656d7c6ea0d7fca0d5d58", parent_id: null };
    var options = {
        sort: { createdAt: -1 },
        // populate: [{ path: 'replies', model: Comment,populate: { path: 'author', model: User,project:{ fullName: 1, userImage: 1 } } },{ path: 'author', model: User }],
        lean: true,
        offset: 0,
        limit: 10,
    };
    Comment.paginate(query, options)
        .then(function (result) {
            if (result) {
                recursivelyPopulatePath(result, "author").then(
                    (populatedNode) => {
                        console.log(populatedNode);

                        return res
                            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                            .json({
                                message: CONSTANTS.ADD_SUCCESSFULLY,
                                data: populatedNode,
                            })
                            .end();
                    }
                );
            }
            // return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            //     message: CONSTANTS.ADD_SUCCESSFULLY,
            //     data: result
            // }).end();
        })
        .catch((err) => {
            throw err;
        });
});
router.post("/add", isVerified, async (req, res) => {
    const { error, value } = comment.validatePost(req.body);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }

    //new post
    var newComment = new Comment();
    newComment.discussion_id = value.discussion_id;
    newComment.parent_id = value.parent_id || null;
    newComment.author = req.user.ID;
    newComment.text = value.text;
    newComment.replies = [];
    newComment.likes = [];
    newComment.disLikes = [];
    newComment.save(async (err, newcomment) => {
        if (err) {
            console.log(err);
            throw err;
        }

        if (!value.parent_id) {
            PostCommentlogIt("comment", {
                person: req.user.ID,
                postID: value.discussion_id,
            });
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.ADD_SUCCESSFULLY,
                    data: newcomment,
                })
                .end();
        } else {
            var updateParentcom = updateParentCommentReply(
                value.parent_id,
                newcomment._id
            );
            updateParentcom.then(
                function (response) {
                    console.log(response);
                    if (response === true) {
                        return res
                            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                            .json({
                                message: CONSTANTS.ADD_SUCCESSFULLY,
                                data: newcomment,
                            })
                            .end();
                    }
                },
                function (err) {
                    console.log(err);
                    throw err;
                }
            );
        }
    });
});

function updateParentCommentReply(parent_id, newID) {
    return new Promise((resolve, reject) => {
        //finding a parent comment

        Comment.updateOne(
            { _id: parent_id },
            {
                $addToSet: {
                    replies: newID,
                },
            },
            { upsert: true }
        )
            .then((parent) => {
                if (parent === null) {
                    reject(false);
                }
                resolve(true);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}
const recursivelyPopulatePath = (entry, path) => {
    if (entry[path]) {
        console.log(entry[path]);
        return Comment.findById(entry[path]).then((foundPath) => {
            return recursivelyPopulatePath(foundPath, path).then(
                (populatedFoundPath) => {
                    entry[path] = populatedFoundPath;
                    return Promise.resolve(entry);
                }
            );
        });
    }
    return Promise.resolve(entry);
};

module.exports = router;
