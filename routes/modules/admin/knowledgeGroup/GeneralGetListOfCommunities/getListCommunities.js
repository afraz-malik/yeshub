const express = require("express");
const router = express.Router();
const Knowledge = require("../../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../../src/model/user/userSchema");
const {
    getCommunityUserList,
} = require("../../../generalModules/communityGeneralOperations");
router.get("/list", async (req, res) => {
    console.log('communities list: ')
    var query = {};
    var options = {
        sort: { createdAt: -1 },
        populate: [
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
            {
                path: "pendingJoining",
                model: User,
                select: { _id: 1, userName: 1 },
            },
            {
                path: "moderators",
                model: User,
                select: { _id: 1, userName: 1 },
            },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };
    Knowledge.paginate(query, options)
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
                    let countUser = await getCommunityUserList(object._id);
                    // Object.assign(object, { userList: listUser });
                    Object.assign(object, { userList: countUser });
                    return object;
                })
            );
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.LIST_OF_COMMUITIES,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = router;
