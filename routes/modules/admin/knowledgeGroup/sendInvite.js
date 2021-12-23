const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");

const instance = new Knowledge();
const {
    checkAlreadyModerator,
    checkCommunityAdmin,
} = require("../../generalModules/communityGeneralOperations");

const {
    InvitelogIt,
} = require("../../events/community/invite/inviteEventListener");
//adding community
router.post("/sendInvite", async (req, res) => {
    console.log("Sending Mod Invitation To User");
    console.log(req.query.ID);
    console.log(req.body.userID);
    console.log(req.user);
    console.log("Sending Mod Invitation To User");

    const invite = {
        ID: req.query.ID,
        userID: req.body.userID,
    };

    let isAdmin = await checkCommunityAdmin(req.user.ID);
    if ([undefined, null, false].includes(isAdmin)) {
        const isModerator = await checkAlreadyModerator(
            req.query.ID,
            req.user.ID
        );
        if ([undefined, null, false].includes(isModerator)) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.FORBIDDEN,
                    message: CONSTANTS.TOKEN_IS_INVALID,
                })
                .end();
        }
    }

    const { error, value } = instance.sendInvite(invite);
    //check for validating data
    if (error) {
        //if error in validating data we have to delete uploaded file
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }

    const existBefore = await checkAlreadyModerator(value.ID, value.userID);
    console.log(existBefore);
    if (existBefore) {
        return res
            .status(CONSTANTS.SERVER_ALREADY_REPORTED_HTTP_CODE)
            .json({
                message: CONSTANTS.ALREADY_MODERATOR,
            })
            .end();
    }

    Knowledge.updateOne(
        { _id: value.ID },
        {
            $addToSet: {
                invitesModerator: value.userID,
            },
        },
        { upsert: true }
    )
        .then((parent) => {
            if (parent === null) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.COMMUNITY_NOT_EXIST,
                    })
                    .end();
            }
            InvitelogIt("SendInviteNotify", {
                communityID: value.ID,
                userID: value.userID,
            });
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.INVITATION_SEND,
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
