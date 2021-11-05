const express = require("express");
const router = express.Router();
const User = require("../../../../../src/model/user/userSchema");
const Knowledge = require("../../../../../src/model/knowledgeGroup/knowledgeGroup");
const {
    checkCommunityAdmin,
    checkCommunityModerator,
    validateCommunity,
} = require("../../../generalModules/communityGeneralOperations");

router.delete("/remove", async (req, res) => {
    checkAdmin = await checkCommunityAdmin(req.user.ID);

    if ([false, undefined, null].includes(checkAdmin)) {
        checkModerator = await checkCommunityModerator(
            req.body.userID,
            req.body.communityID
        );
        console.log("checkModerator: ", checkModerator);
        if ([false, undefined, null].includes(checkModerator)) {
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

    // checkModerator = await checkCommunityModerator(
    //     req.body.userID,
    //     req.body.communityID
    // );
    // if (!checkModerator || checkModerator === null) {
    //     return res
    //         .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
    //         .json({
    //             message: CONSTANTS.PERSON_IS_NOT_MODERATOR,
    //         })
    //         .end();
    // }

    Knowledge.updateOne(
        { _id: req.body.communityID },
        {
            $pull: { moderators: { $in: [req.body.userID] } },
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
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.MODERATOR_DELETED_COMMUNITY_SUCCESSFULLY,
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
