const express = require("express");
const router = express.Router();
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
router.get("/list", (req, res) => {
    var query = { _id: req.user.ID };
    var options = {
        select: { joinedCommunities: 1 },
        sort: { createdAt: -1 },
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        populate: [
            {
                path: "joinedCommunities",
                model: Knowledge,
                //select: { _id: 1, userName: 1 },
            },
        ],
        limit: 10,
    };
    User.findOne(query)
        .select({
            joinedCommunities: 1,
        })
        .populate({
            path: "joinedCommunities",
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
            match:{isArchived: false}
        })
        .then(function (result) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.JOINING_COMMUNITIES_LIST,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = router;
