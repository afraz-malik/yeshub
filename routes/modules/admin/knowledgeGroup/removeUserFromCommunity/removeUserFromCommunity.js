const express = require("express");
const router = express.Router();
const User = require("../../../../../src/model/user/userSchema");
const Knowledge = require("../../../../../src/model/knowledgeGroup/knowledgeGroup");
const {
    checkCommunityAdmin,
    checkCommunityModerator,
    validateCommunity,
} = require("../../../generalModules/communityGeneralOperations");
const {
    checkJoined,
} = require("../../../generalModules/userGeneralOperations");
const knowledgeGroup = require("../../../../../src/model/knowledgeGroup/knowledgeGroup");

router.delete("/remove", async (req, res) => {
    checkAdmin = await checkCommunityAdmin(req.user.ID);
    if (!checkAdmin || checkAdmin === null) {
        checkModerator = await checkCommunityModerator(
            req.user.ID,
            req.body.communityID
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

    let community = await validateCommunity(req.body.communityID);
    if (!community) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.COMMUNITY_NOT_EXIST,
            })
            .end();
    }

    let validateJoined = await checkJoined(
        req.body.communityID,
        req.body.userID
    );
    if (!validateJoined) {
        return res
            .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
            .json({
                message: CONSTANTS.PERSON_NOT_JOINED_COMMUNITY,
            })
            .end();
    }

    User.updateOne(
        { _id: req.body.userID },
        {
            $pull: { joinedCommunities: { $in: [req.body.communityID] } },
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

            console.log(parent._id);

            return knowledgeGroup.updateOne(
                { _id: req.body.communityID },
                { $pull: { moderators: { $in: req.body.userID } } },
                { upsert: false, new: true }
            );
        })
        .then((updatedCommunity) => {
            console.log(
                updatedCommunity,
                " Also removed from moderatorship ....",
                updatedCommunity
            );
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.USER_DELETED_COMMUNITY_SUCCESSFULLY,
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

module.exports = router;
