const express = require("express");
const router = express.Router();
const User = require("../../../../src/model/user/userSchema");
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
//community middleware
const {
    incrementCommunityMember,
    decrementCommunityMember,
} = require("../../generalModules/communityGeneralOperations");
const validateCommunity = require("../../../../middleware/community/checkCommunityExist");
const checkJoined = require("../../../../middleware/community/checkJoined");
const checkLeaved = require("../../../../middleware/community/checkLeaved");
const isVerified = require("../../../../middleware/isVerified");
const {
    CommunitylogIt,
} = require("../../events/community/communityEventListener");
const auth = require("../../../../middleware/auth");

const {
    JoiningRequestlogIt,
} = require("../../events/user/JoiningRequestToAdminListener");
const {
    getCommunityUserList,
} = require("../../generalModules/communityGeneralOperations");
const knowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const { update } = require("lodash");

// User Join Community
router.put(
    "/join",
    [isVerified, validateCommunity, checkJoined],
    async (req, res) => {
        if (req.body.type == 1) {
            // type 1: Community auto join not required approval by mod/admin
            User.updateOne(
                { _id: req.user.ID },
                {
                    $addToSet: {
                        joinedCommunities: req.query.ID,
                    },
                },
                { upsert: true }
            )
                .then((parent) => {
                    // increment community members count on joining community
                    incrementCommunityMember(req.query.ID);
                    if (parent === null) {
                        return res
                            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                            .json({
                                message: CONSTANTS.NOT_FOUND,
                            })
                            .end();
                    }
                    CommunitylogIt("communityJoin", {
                        ID: req.user.ID,
                        points: CONSTANTS.FIRST_THREE_COMMUNITIES_JOINIED_POINT,
                    });
                    JoiningRequestlogIt("JoinedRequestNotify", {
                        userID: req.user.ID,
                        communityID: req.query.ID,
                    });
                    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        message: CONSTANTS.JOINED_COMMUITY,
                        data: true,
                        isJoined: true,
                        isJoinPending: false,
                    });
                })
                .catch((err) => {
                    if (err) {
                        return res
                            .status(
                                CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE
                            )
                            .json({
                                error: CONSTANTS.INTERNAL_ERROR,
                                message: err.message,
                            })
                            .end();
                    }
                });
        } else {
            Knowledge.updateOne(
                { _id: req.query.ID },
                {
                    $addToSet: {
                        pendingJoining: req.user.ID,
                    },
                },
                { upsert: true }
            )
                .then((parent) => {
                    if (parent === null) {
                        return res
                            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                            .json({
                                message: CONSTANTS.NOT_FOUND,
                            })
                            .end();
                    }
                    CommunitylogIt("communityJoin", {
                        ID: req.user.ID,
                        points: CONSTANTS.FIRST_THREE_COMMUNITIES_JOINIED_POINT,
                    });
                    JoiningRequestlogIt("JoinedRequestPendingNotify", {
                        userID: req.user.ID,
                        communityID: req.query.ID,
                    });

                    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        message: CONSTANTS.JOING_REQUEST_SUBMITTED,
                        data: true,
                        isJoined: false,
                        isJoinPending: true,
                    });
                })
                .catch((err) => {
                    if (err) {
                        return res
                            .status(
                                CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE
                            )
                            .json({
                                error: CONSTANTS.INTERNAL_ERROR,
                                message: err.message,
                            })
                            .end();
                    }
                });
        }
    }
);

// User Leave Community
router.put("/leave", [validateCommunity, checkLeaved], async (req, res) => {
    User.updateOne(
        { _id: req.user.ID },
        {
            $pull: { joinedCommunities: { $in: [req.query.ID] } },
        },
        { upsert: true }
    )
        .then((User) => {
            if (User === null) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.NOT_FOUND,
                    })
                    .end();
            }
            // decrement community total Members on leaving community
            decrementCommunityMember(req.query.ID);
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.LEAVED_COMMUNITY,
                data: true,
            });
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

// Community Detail
router.route("/detail/:id").get(auth, getDetailById);
async function getDetailById(req, res) {
    let totalMembers = await User.countDocuments({
        joinedCommunities: { $in: [req.params.id] },
    });
    let isJoined = await User.findOne({
        _id: req.user.ID,
        joinedCommunities: { $in: req.params.id },
    });
    let projection = {
        name: 1,
        moderators: 1,
        pendingJoining: 1,
        logo: 1,
        slug: 1,
        description: 1,
        coverImage: 1,
        rules: 1,
        invitesModerator: 1,
    };
    Knowledge.findOne({ _id: req.params.id }, projection)
        .populate({ path: "moderators", select: "userName userImage" })
        .lean(true)
        .then((data) => {
            data.totalMembers = totalMembers;
            data.isJoined = isJoined ? true : false;
            data.isModerator = checkModerator(data.moderators, req.user.ID);
            // data.moderators
            //     .map((itm) => {
            //         return itm.toString();
            //     })
            //     .indexOf(req.user.ID) != -1
            //     ? true
            //     : false;;
            data.isJoinPending =
                data.pendingJoining
                    .map((itm) => {
                        return itm.toString();
                    })
                    .indexOf(req.user.ID) == -1
                    ? false
                    : true;
            data.isInvited =
                data.invitesModerator
                    .map((itm) => {
                        return itm.toString();
                    })
                    .indexOf(req.user.ID) == -1
                    ? false
                    : true;
            delete data.pendingJoining;
            delete data.invitesModerator;

            res.status(200).json({ status: true, data: data });
        });
}

function getUsers(id) {
    return User.find({ joinedCommunities: { $in: [id] } })
        .select({ userName: 1, userImage: 1 })
        .lean(true);
}

function checkJoining(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id == id) {
            return true;
        }
    }

    return false;
}

function checkModerator(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id == id) {
            return true;
        }
    }

    return false;
}

module.exports = router;
