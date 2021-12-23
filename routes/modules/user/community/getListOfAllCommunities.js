const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");

const {
    getCommunities,
} = require("../../generalModules/userGeneralOperations");
const {
    getCommunityUserList,
} = require("../../generalModules/communityGeneralOperations");
const knowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");

const auth = require("../../../../middleware/auth");

// get all communities
router.get("/all/list", auth, async (req, res) => {
    console.log(req.user.ID);

    let userCommunities = await getCommunities(req.user.ID);
    let userJoinedCommunities =
        userCommunities == null ? [] : userCommunities.joinedCommunities;
    console.log("joined", userJoinedCommunities);
    let query = {};
    let options = {
        select: {
            _id: 1,
            description: 1,
            logo: 1,
            coverImage: 1,
            name: 1,
            rules: [],
            slug: 1,
            pendingJoining: 1,
            totalMembers: 1,
            // moderators: 1
        },
        sort: { totalMembers: -1, createdAt: -1 },
        populate: [
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 100,
    };

    knowledgeGroup.paginate(query, options).then(async (result) => {
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
                let listUser = []; // await getUsersList(object._id);
                // listUser.forEach(user => {
                //     user.isModerator = object.moderators.indexOf(user._id) == -1 ? false : true;
                //     user.isPendingJoin = object.pendingJoining.indexOf(user._id) == -1 ? false : true;
                // });

                let isJoinPending = checkPending(
                    req.user.ID,
                    object.pendingJoining
                );
                let isJoined =
                    userJoinedCommunities.indexOf(object._id) == -1
                        ? false
                        : true;
                // let isModerator = object.moderators.indexOf(req.user.ID) == -1 ? false : true;
                Object.assign(object, {
                    isJoined: isJoined,
                    userList: listUser,
                    isJoinPending: isJoinPending,
                });
                return object;
            })
        );
        return res
            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
            .json({
                message: CONSTANTS.LIST_OF_COMMUITIES,
                data: attributes,
            })
            .end();
    });
});

function checkPending(id, ids) {
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] == id) {
            return true;
        }
    }

    return false;
}
function getUsersList(id) {
    return User.find(
        { joinedCommunities: { $in: [id] } },
        "userName userImage"
    ).lean(true);
}

// get list of communities user not joined
router.get("/list", async (req, res) => {
    const token = req.header("x-auth-token");
    if (token) {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        if (decoded.ID) {
            req.user = decoded;
        }
    }
    var query = {};
    if (req.user) {
        let communities = await getCommunities(req.user.ID);
        let joinedCommunities =
            communities != null ? communities.joinedCommunities : [] || [];
        query = { _id: { $nin: joinedCommunities }, isArchived: false };
    }

    var options = {
        select: {
            _id: 1,
            description: 1,
            logo: 1,
            coverImage: 1,
            likes: 1,
            disliskes: 1,
            published: 1,
            name: 1,
            rules: [],
            slug: 1,
            pendingJoining: 1,
        },
        sort: { createdAt: -1 },
        populate: [
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
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
                    let listUser = await getCommunityUserList(object._id);
                    let isJoinPending = checkPending(
                        req.user.ID,
                        object.pendingJoining
                    );
                    Object.assign(object, {
                        userList: listUser,
                        isJoinPending: isJoinPending,
                        totalMembers: listUser.length,
                    });
                    return object;
                })
            );
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.LIST_OF_COMMUITIES,
                    data: attributes,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});
module.exports = router;
