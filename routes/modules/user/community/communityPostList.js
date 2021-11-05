const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const {
    checkCommunityModerator,
    validateCommunity,
    validateCommunityExistBySlug,
} = require("../../generalModules/communityGeneralOperations");
const { validateID } = require("../../generalModules/general");
const {
    isLiked,
    isDisLiked,
} = require("../../generalModules/postGeneralOperations");
const Post = require("../../../../src/model/user/post/postSchema");
const categorySchema = require("../../../../src/model/category/category");
const knowledgeSchema = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
const auth = require("../../../../middleware/auth");

//get user all post by community id
router.get("/list", auth, async (req, res) => {
    let user = User.findOne(req.user.ID, "joinedCommunities savedPost");
    let isModerator = false;
    //check for requester token
    const token = req.header("x-auth-token");
    if (token) {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        if (decoded.ID) {
            req.user = decoded;
        }
    }

    if (!req.query.ID) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.ID_IS_REQUIRED,
            })
            .end();
    }

    if (validateID(req.query.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    const communityExist = validateCommunity(req.query.ID);
    if (!communityExist) {
        return res
            .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            .json({
                message: CONSTANTS.NOT_FOUND,
            })
            .end();
    }
    if (req.user) {
        let moderator = checkCommunityModerator(req.user.ID, req.query.ID);
        if (moderator) {
            isModerator = true;
        }
    }

    var options = {
        sort: { createdAt: -1 },
        populate: [
            { path: "knowledgeGroup", select: { logo: 1, name: 1, slug: 1 } },
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };
    let savedPosts = await User.findOne(
        { _id: req.user.ID },
        "savedPosts joinedCommunities"
    ).lean(true);
    var query = { knowledgeGroup: req.query.ID, isPublished: true };
    Post.paginate(query, options)
        .then((data) => {
            data.docs.forEach((post) => {
                post.isLiked =
                    post.likes.indexOf(req.user.ID) == -1 ? false : true;
                post.isDisLiked =
                    post.disLikes.indexOf(req.user.ID) == -1 ? false : true;
                post.isSaved =
                    savedPosts.savedPosts.indexOf(post._id) == -1
                        ? false
                        : true;
                post.knowledgeGroup.isJoined = checkExistence(
                    req.user.ID,
                    savedPosts.joinedCommunities
                );
            });
            res.status(200).json({ status: true, data: data });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
});

//list by slug
router.get("/listBySlug", async (req, res) => {
    let isModerator = false;
    //check for requester token
    const token = req.header("x-auth-token");
    if (token) {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        if (decoded.ID) {
            req.user = decoded;
        }
    }

    if (!req.query.slug) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.SLUG_IS_REQUIRED,
            })
            .end();
    }
    const communityExist = await validateCommunityExistBySlug(req.query.slug);
    if (!communityExist) {
        return res
            .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            .json({
                message: CONSTANTS.NOT_FOUND,
            })
            .end();
    }
    if (req.user) {
        let moderator = checkCommunityModerator(
            req.user.ID,
            communityExist._id
        );
        if (moderator) {
            isModerator = true;
        }
    }

    var query = { knowledgeGroup: communityExist._id, isPublished: true };
    var options = {
        sort: { createdAt: -1 },
        populate: [
            { path: "category", model: categorySchema },
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
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
            Object.assign(attributes, { isModerator: isModerator });
            attributes["docs"] = await Promise.all(
                _.map(result.docs, async function (object) {
                    if (req.user) {
                        let liked = await isLiked(object._id, req.user.ID);
                        (await liked) === null
                            ? Object.assign(object, { isLike: false })
                            : Object.assign(object, { isLike: true });
                        let Disliked = await isDisLiked(
                            object._id,
                            req.user.ID
                        );
                        (await Disliked) === null
                            ? Object.assign(object, { isDisLike: false })
                            : Object.assign(object, { isDisLike: true });
                    }
                    return object;
                })
            );
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.LIST_OF_COMMUITY_POST,
                    data: attributes,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

function checkExistence(id, ids) {
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] == id) {
            return true;
        }
    }
    return false;
}

module.exports = router;
