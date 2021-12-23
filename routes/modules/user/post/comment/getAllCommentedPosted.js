const express = require("express");
const router = express.Router();
const Post = require("../../../../../src/model/user/post/postSchema");
const Knowledge = require("../../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../../src/model/user/userSchema");
const {
    getUsercommentPost,
    isLiked,
    isDisLiked,
} = require("../../../generalModules/postGeneralOperations");
const {
    checkCommunityModerator,
} = require("../../../generalModules/communityGeneralOperations");

router.get("/get", async (req, res) => {
    let posts = await getUsercommentPost(req.user.ID);
    var query = { _id: { $in: posts } };
    var options = {
        select: {
            _id: 1,
            description: 1,
            image: 1,
            likes: 1,
            disliskes: 1,
            isPublished: 1,
            title: 1,
            slug: 1,
        },
        sort: { createdAt: -1 },
        populate: [
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
            {
                path: "knowledgeGroup",
                model: Knowledge,
                select: {
                    _id: 1,
                    description: 1,
                    logo: 1,
                    coverImage: 1,
                    likes: 1,
                    disliskes: 1,
                    published: 1,
                    name: 1,
                    slug: 1,
                },
            },
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
            attributes["docs"] = await Promise.all(
                _.map(result.docs, async function (object) {
                    let moderator = checkCommunityModerator(
                        req.user.ID,
                        object.knowledgeGroup._id
                    );
                    moderator === null
                        ? Object.assign(object, { isModerator: false })
                        : Object.assign(object, { isModerator: true });
                    let liked = await isLiked(object._id, req.user.ID);
                    (await liked) === null
                        ? Object.assign(object, { isLike: false })
                        : Object.assign(object, { isLike: true });
                    let Disliked = await isDisLiked(object._id, req.user.ID);
                    (await Disliked) === null
                        ? Object.assign(object, { isDisLike: false })
                        : Object.assign(object, { isDisLike: true });
                    return object;
                })
            );
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.COMMENTED_POST_LIST,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = router;
