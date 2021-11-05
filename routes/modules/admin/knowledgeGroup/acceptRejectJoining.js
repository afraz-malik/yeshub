const express = require("express");
const router = express.Router();
const User = require("../../../../src/model/user/userSchema");
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const {
    CommunitylogIt,
} = require("../../events/community/communityEventListener");
const {
    checkCommunityAdmin,
    checkCommunityModerator,
} = require("../../generalModules/communityGeneralOperations");
//community middleware
const validateCommunity = require("../../../../middleware/community/checkCommunityExist");
const checkPeniding = require("../../../../middleware/community/checkPendingJoining");
const validateRequester = require("../../../../middleware/community/checkCommunityOwnweModerator");
const {
    incrementCommunityMember,
} = require("../../generalModules/communityGeneralOperations");
const {
    JoiningResponselogIt,
} = require("../../events/user/adminRespondToJoining");

router.put("/accept", [validateCommunity, checkPeniding], async (req, res) => {
    checkAdmin = await checkCommunityAdmin(req.user.ID);
    if (!checkAdmin || checkAdmin === null) {
        checkModerator = await checkCommunityModerator(
            req.user.ID,
            req.query.ID
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

    console.log("--- moderator is authorized ---");
    Knowledge.updateOne(
        { _id: req.query.ID },
        {
            $pull: { pendingJoining: { $in: [req.body.userID] } },
        },
        { upsert: true }
    )
        .then((parent) => {
            console.log("testing parent :  ", parent);
            if (parent === null) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.NOT_FOUND,
                    })
                    .end();
            }
            User.updateOne(
                { _id: req.body.userID },
                {
                    $addToSet: {
                        joinedCommunities: req.query.ID,
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
                    incrementCommunityMember(req.query.ID);
                    CommunitylogIt("communityJoin", {
                        ID: req.body.userID,
                        points: CONSTANTS.FIRST_THREE_COMMUNITIES_JOINIED_POINT,
                    });
                    JoiningResponselogIt("SendJoningResponseNotify", {
                        communityID: req.query.ID,
                        userID: req.body.userID,
                        status: "accepted",
                    });
                    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        message: CONSTANTS.ACCEPTED_JOING_REQUEST,
                        data: true,
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

router.put(
    "/reject",
    [validateCommunity, validateRequester, checkPeniding],
    async (req, res) => {
        Knowledge.updateOne(
            { _id: req.query.ID },
            {
                $pull: { pendingJoining: { $in: [req.body.userID] } },
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

                JoiningResponselogIt("SendJoningResponseNotify", {
                    communityID: req.query.ID,
                    userID: req.body.userID,
                    status: "rejected",
                });
                return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    message: CONSTANTS.REJECTED_JOING_REQUEST,
                    data: true,
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
);

module.exports = router;
