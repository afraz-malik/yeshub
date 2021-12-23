const express = require("express");
const router = express.Router();
const GenPost = require("../GenPost/gen-post.model");
//post event
const { PostlogIt } = require("../../events/post/postEventListener");
const {
    checkCommunityAdmin,
    checkCommunityModerator,
    checkCommunityPostAuthor,
    checkPost,
} = require("../../generalModules/communityGeneralOperations");
const {
    deleteSaveIfPostDelete,
    deleteAllPostComments,
} = require("../../generalModules/postGeneralOperations");
const {
    validateUserRole,
} = require("../../generalModules/userGeneralOperations");
const {
    validateID,
    deleteRequestFiles,
    slug,
    deleteImage,
} = require("../../generalModules/general");
const Post = require("../../../../src/model/user/post/postSchema");
const categorySchema = require("../../../../src/model/category/category");
const knowledgeSchema = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
const Vote = require("../post/votes/vote.model").PostVote;
//upload images middleware
const {
    ImageUploader,
} = require("../../../../middleware/multipleImagesUploads");
const resizeContainer = require("../../../../middleware/multipleResizeImages");
//validate post user middleware
const authPostUser = require("../../../../middleware/authPostUserByPostID");
const isVerified = require("../../../../middleware/isVerified");
const { post } = require("./votes/vote.api");
const KnowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const { Error } = require("mongoose");
const instance = new Post();
//get user all post
function filterCommunities(users, availables) {
    let temp = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < availables.length; j++) {
            if (users[i].equals(availables[j])) {
                availables.splice(j, 1);
                temp.push(users[i]);
                break;
            }
        }
    }
    return temp;
}

router.get("/detail/byid/:ID", async function (req, res) {
    let populate = [
        {
            path: "knowledgeGroup",
            select: "name logo slug pendingJoining",
        },
        {
            path: "author",
            select: "userName userImage",
        },
        {
            path: "upVoteCount",
        },
        {
            path: "downVoteCount",
        },
    ];

    const user = await User.findOne({ _id: req.user.ID });
    Post.findOne({ _id: req.params.ID })
        .populate(populate)
        .then(async function (post) {
            if (!post) {
                return res
                    .status(422)
                    .json({ message: "Post Against Id is removed" });
            }
            post.knowledgeGroup.totalMembers = await User.countDocuments({
                joinedCommunities: { $in: [post.knowledgeGroup._id] },
            });
            post.knowledgeGroup.isJoined =
                user.joinedCommunities.indexOf(post.knowledgeGroup._id) == -1
                    ? false
                    : true;
            post.knowledgeGroup.isJoinPending =
                post.knowledgeGroup.pendingJoining.indexOf(req.user.ID) == -1
                    ? false
                    : true;
            delete post.knowledgeGroup.pendingJoining;

            post.isSaved =
                user.savedPosts.indexOf(req.user.ID) == -1 ? false : true;
            let likeStatus = await getLikeStatus(req.user.ID, post._id);
            post.isLiked =
                likeStatus == null
                    ? false
                    : likeStatus.voteType == "up"
                    ? true
                    : false;
            post.isDisLiked =
                likeStatus == null
                    ? false
                    : likeStatus.voteType == "down"
                    ? true
                    : false;
            post.totalLikes = post.upVoteCount - post.downVoteCount;
            post.comments = [];

            delete post.upVoteCount;
            delete post.downVoteCount;

            res.status(200).json(result);
        })
        .catch((Error) => {
            console.log(Error);
            res.status(500).json({ status: false, message: Error.message });
        });
});

// GET All posts (paginated)
// if req.query.ID : --> get some one's posts
// else get user's own posts.
router.get("/getAll", async (req, res) => {
    let ID = req.query.ID ? req.query.ID : req.user.ID;
    let archivedCommunities = await KnowledgeGroup.find({
        isArchived: true,
    }).distinct("_id");

    let user = await User.findOne(
        { _id: req.user.ID },
        "savedPosts joinedCommunities"
    ).lean(true);
    let allCommunities = await KnowledgeGroup.find({ isArchived: false })
        .distinct("_id")
        .lean(true);
    let userjoinedCommunities = _.intersection(
        user.joinedCommunities.map((e) => {
            return e.toString();
        }),
        allCommunities.map((e) => {
            return e.toString();
        })
    );
    let savedPosts = user.savedPosts;
    var query = {
        author: ID,
        knowledgeGroup: {
            $in: userjoinedCommunities,
        },
    };

    var options = {
        //select:   'title date author',
        sort: { createdAt: -1 },
        populate: [
            { path: "category", model: categorySchema },
            {
                path: "knowledgeGroup",
                model: knowledgeSchema,
                select: "slug name description logo",
            },
            { path: "upVoteCount" },
            { path: "downVoteCount" },
            { path: "commentsCount" },
            { path: "author", select: "userName userImage" },
            // { path: "comments", options: { limit: 1, skip: 0 } },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };
    Post.paginate(query, options)
        .then(async function (result) {
            let data = await Promise.all(
                _.map(result.docs, function (post) {
                    post.comments = [];
                    post.vote = post.upVoteCount - post.downVoteCount;
                    post.isSaved =
                        savedPosts.indexOf(post._id) == -1 ? false : true;
                    return post;
                })
            );
            result.docs = data;
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.USER_LIST_OF_POSTS,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

router.post(
    "/add",
    [isVerified, ImageUploader(5, "post"), resizeContainer],
    async (req, res) => {
        let links = [];
        if (Array.isArray(req.body.link)) {
            req.body.link.map((item) => {
                links.push(JSON.parse(item));
            });
        } else {
            const singleLink = JSON.parse(req.body.link);
            if (!singleLink.title && !singleLink.url) {
            } else {
                links.push(singleLink);
            }
        }

        checkUser = await validateUserRole(req.user.ID);
        if (!checkUser || checkUser === null) {
            return res
                .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                .json({
                    error: CONSTANTS.UNAUTHORIZED,
                    message: CONSTANTS.FORBIDDEN,
                })
                .end();
        }
        const post = {
            title: req.body.title,
            description: req.body.description,
            slug: slug(req.body.title),
            knowledgeGroup: req.body.knowledgeGroup,
            link: links,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
            videoUrl: req.body.videoUrl,
        };

        const { error, value } = instance.validatePost(post);
        if (error) {
            deleteRequestFiles(req.body.images);
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }

        //new post
        var newPost = new Post();
        newPost.title = value.title;
        newPost.videoUrl = value.videoUrl;
        newPost.author = req.user.ID;
        newPost.description = value.description;
        newPost.slug = value.slug;
        newPost.knowledgeGroup = value.knowledgeGroup || null;
        newPost.profile =
            value.knowledgeGroup === undefined ? req.user.ID : null;
        newPost.image = req.body.images || [];
        newPost.link = value.link || [];
        newPost.tags = value.tags || [];
        console.log(value.isPublished);
        newPost.isPublished = value.isPublished;
        newPost.save((err, post) => {
            if (err) {
                throw err;
            }
            eventTrigger(req.user.ID);
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.ADD_SUCCESSFULLY,
                    data: post,
                })
                .end();
        });
    }
);

//delete post
router.delete("/delete", async (req, res) => {
    if (validateID(req.query.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    const postExist = await checkPost(req.query.ID);
    if (!postExist || postExist === null) {
        //NOT_FOUND
        return res
            .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            .json({
                message: CONSTANTS.NOT_FOUND,
            })
            .end();
    }

    const checkUser = await checkCommunityPostAuthor(req.user.ID, req.query.ID);
    if (!checkUser || checkUser === null) {
        checkAdmin = await checkCommunityAdmin(req.user.ID);
        if (!checkAdmin || checkAdmin === null) {
            checkModerator = await checkCommunityModerator(
                req.user.ID,
                postExist.knowledgeGroup
            );
            if (!checkModerator || checkModerator === null) {
                return res
                    .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                    .json({
                        error: CONSTANTS.UNAUTHORIZED,
                        message: CONSTANTS.FORBIDDEN,
                    })
                    .end();
            }
        }
    }
    const del = await GenPost.remove({ post: req.query.ID });
    Post.findByIdAndRemove(req.query.ID, async (err, result) => {
        if (err) throw err;
        if (result === null) {
            return res
                .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                .json({
                    message: CONSTANTS.NOT_EXIST,
                })
                .end();
        }
        //deleting Image
        if (result.image !== undefined || result.image.length != 0) {
            // array empty or does not exist
            deleteRequestFiles(result.image);
            await deleteSaveIfPostDelete(req.query.ID);
            await deleteAllPostComments(req.query.ID);
        }
        res.status(200).json({
            message: CONSTANTS.DELETED_SUCCESSFULLY,
            delete: true,
        });
    });
});

//delete post image
router.delete("/deleteImage", async (req, res) => {
    if (validateID(req.body.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    const postExist = await checkPost(req.body.ID);
    if (!postExist || postExist === null) {
        //NOT_FOUND
        return res
            .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            .json({
                message: CONSTANTS.NOT_FOUND,
            })
            .end();
    }

    const checkUser = await checkCommunityPostAuthor(req.user.ID, req.body.ID);
    if (!checkUser || checkUser === null) {
        checkAdmin = await checkCommunityAdmin(req.user.ID);
        if (!checkAdmin || checkAdmin === null) {
            checkModerator = await checkCommunityModerator(
                req.user.ID,
                postExist.knowledgeGroup
            );
            if (!checkModerator || checkModerator === null) {
                return res
                    .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                    .json({
                        error: CONSTANTS.UNAUTHORIZED,
                        message: CONSTANTS.FORBIDDEN,
                    })
                    .end();
            }
        }
    }

    Post.updateOne(
        { _id: req.body.ID },
        {
            $pull: {
                image: { $in: [req.body.image] },
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
            if (result.nModified === 1) {
                deleteImage(req.body.image);
            }
            return res
                .status(200)
                .json({
                    message: CONSTANTS.DELETED_SUCCESSFULLY,
                    delete: true,
                })
                .end();
        })
        .catch((err) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.message,
                    })
                    .end();
            }
        });
});

//update post
router.put("/update", async (req, res) => {
    if (validateID(req.body.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }

    const postExist = await checkPost(req.body.ID);
    if (!postExist || postExist === null) {
        //NOT_FOUND
        return res
            .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            .json({
                message: CONSTANTS.NOT_FOUND,
            })
            .end();
    }

    const checkUser = await checkCommunityPostAuthor(req.user.ID, req.body.ID);
    if (!checkUser || checkUser === null) {
        checkAdmin = await checkCommunityAdmin(req.user.ID);
        if (!checkAdmin || checkAdmin === null) {
            checkModerator = await checkCommunityModerator(
                req.user.ID,
                postExist.knowledgeGroup
            );
            if (!checkModerator || checkModerator === null) {
                return res
                    .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                    .json({
                        error: CONSTANTS.UNAUTHORIZED,
                        message: CONSTANTS.FORBIDDEN,
                    })
                    .end();
            }
        }
    }

    req.body.slug = slug(req.body.title);
    let ID = req.body.ID;
    delete req.body.ID;
    const { error, value } = instance.validatePost(req.body);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    Post.findOneAndUpdate(
        { _id: ID },
        {
            $set: value,
        },
        { new: true }
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
                    message: CONSTANTS.UPDATED_SUCCESSFULLY,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.message,
                    })
                    .end();
            }
        });
});

// update image
router.put(
    "/updateimage/:id",
    [ImageUploader(5, "post"), resizeContainer],
    async (req, res) => {
        console.log("[PUT] update image");
        const postExist = await checkPost(req.params.id);
        if (!postExist || postExist === null) {
            //NOT_FOUND
            return res
                .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
                .json({
                    message: CONSTANTS.NOT_FOUND,
                })
                .end();
        }

        const checkUser = await checkCommunityPostAuthor(
            req.user.ID,
            req.params.id
        );
        if (!checkUser || checkUser === null) {
            checkAdmin = await checkCommunityAdmin(req.user.ID);
            if (!checkAdmin || checkAdmin === null) {
                checkModerator = await checkCommunityModerator(
                    req.user.ID,
                    postExist.knowledgeGroup
                );
                if (!checkModerator || checkModerator === null) {
                    return res
                        .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                        .json({
                            error: CONSTANTS.UNAUTHORIZED,
                            message: CONSTANTS.FORBIDDEN,
                        })
                        .end();
                }
            }
        }

        Post.findOne({ _id: req.params.id })
            .then((data) => {
                let images = req.body.images || [];
                images.forEach((image) => {
                    data.image.push(image);
                });
                data.save().then((result) => {
                    res.status(200).json({
                        status: true,
                        message: "images updated successfully",
                        data: result.image,
                        newlyAddedImages: req.body.images,
                    });
                });
            })
            .catch((error) =>
                res.status(500).json({ status: false, message: error.message })
            );
    }
);

// check also for moderator of the group
router.put("/pin/by/id/:id", async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id }).populate({
            path: "knowledgeGroup",
            select: "moderators",
        });

        if (post.knowledgeGroup.moderators.indexOf(req.user.ID) == -1) {
            return res.status(403).json({ message: "forbidden" });
        }

        let commmunity = post.knowledgeGroup._id;
        let unpinAll = await Post.update(
            { knowledgeGroup: commmunity },
            { $set: { isPined: false } },
            { upsert: false, multi: true, new: true }
        );
        let pin = await Post.findOneAndUpdate(
            { _id: req.params.id },
            { isPined: true },
            { upsert: false, new: true }
        );

        res.json({ status: true, message: "post pinned successfully" });
    } catch (error) {
        res.status(error.status || 500).json({
            status: false,
            message: error.message,
        });
    }
});

router.put("/unpin/by/id/:id", async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id }).populate({
            path: "knowledgeGroup",
            select: "moderators",
        });

        if (post.knowledgeGroup.moderators.indexOf(req.user.ID) == -1) {
            return res.status(403).json({ message: "forbidden" });
        }
        let commmunity = post.knowledgeGroup._id;
        let pin = await Post.findOneAndUpdate(
            { _id: req.params.id },
            { isPined: false },
            { upsert: false, new: true }
        );

        res.json({ status: true, message: "post Unpinned successfully" });
    } catch (error) {
        res.status(error.status || 500).json({
            status: false,
            message: error.message,
        });
    }
});

router.route("/getAll/by/trend").get(getTrendingPosts);

async function getTrendingPosts(req, res) {
    let user = await User.find;
    let query = {};
    let options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        populate: [
            {
                path: "author",
                select: "userName userImage",
            },
            {
                path: "knowledgeGroup",
                select: "moderators name slug logo",
            },
        ],
    };
}
// router.route('/getAll/by/hot').get(getHotPosts);

function eventTrigger(userID) {
    PostlogIt("firstPost", {
        ID: userID,
        points: CONSTANTS.FIRST_POST_POINT,
    });
    PostlogIt("TenPost", {
        ID: userID,
        points: CONSTANTS.CREATE_TEN_POST_POINT,
    });
    PostlogIt("TwentyFivePost", {
        ID: userID,
        points: CONSTANTS.CREATE_TWENTY_FIVE_POST_POINT,
    });
    PostlogIt("FiftyPost", {
        ID: userID,
        points: CONSTANTS.CREATE_FIFTY_POST_POINT,
    });
    PostlogIt("HundredPost", {
        ID: userID,
        points: CONSTANTS.CREATE_HUNDRED_POST_POINT,
    });
}

function getLikeStatus(userID, postID) {
    return Vote.findOne({ userId: userID, postId: postID });
}

function getPost(query) {
    return Post.paginate(query, options);
}
module.exports = router;
