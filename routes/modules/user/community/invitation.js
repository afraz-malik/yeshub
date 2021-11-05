const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const instance = new Knowledge();
const Message = require("../../chat/message.model");
const User = require("../../../../src/model/user/userSchema");
const { SendChatEvent } = require("../../events/chat/chat-event");
const {
    InviteResponselogIt,
} = require("../../events/user/invitationRespondListener");

//adding community
router.put("/acceptInvite", (req, res) => {
    console.log("Accepting Invitation ....");
    const { error, value } = instance.acceptInvite(req.query);
    //check for validating data
    if (error) {
        //if error in validating data we have to delete uploaded file
        console.log("-- some error --");
        console.log(error.message);
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    Knowledge.updateOne(
        { _id: value.ID },
        {
            $addToSet: {
                moderators: req.user.ID,
            },
            $pull: { invitesModerator: { $in: [req.user.ID] } },
        },
        { upsert: true }
    )
        .then(async (parent) => {
            console.log("--- checking accepted invitation ----");
            console.log(parent);
            console.log("--- checking accepted invitation ----");
            let newsuer = await User.findOne({ _id: req.user.ID }, "userName");
            let message = new Message({
                community: value.ID,
                message: newsuer.userName + " has joined the chat",
                conversationID: "in-" + value.ID,
            });
            let saved = await message.save();
            let populated = await Message.populate(saved, {
                path: "community",
                select: "name logo",
            });
            SendChatEvent("send-message", {
                event: "mods-in-com-" + value.ID,
                saved,
            });
            // console.log(parent);
            if (parent === null) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.NO_INVITATION_FOUND,
                    })
                    .end();
            }
            InviteResponselogIt("SendInviteResponseNotify", {
                userID: req.user.ID,
                communityID: value.ID,
                status: CONSTANTS.INVITE_ACCEPTED,
            });
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.INVITE_ACCEPTED,
                data: true,
            });
        })
        .catch((err) => {
            console.log("error in invitation ...");
            console.log(err);
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

router.put("/rejectInvite", (req, res) => {
    const Invite = {};
    const { error, value } = instance.acceptInvite(req.query);
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
    Knowledge.updateOne(
        { _id: value.ID },
        {
            $pull: { invitesModerator: { $in: [req.user.ID] } },
        },
        { upsert: true }
    )
        .then((parent) => {
            if (parent === null) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.NO_INVITATION_FOUND,
                    })
                    .end();
            }
            InviteResponselogIt("SendInviteResponseNotify", {
                userID: req.user.ID,
                communityID: value.ID,
                status: CONSTANTS.INVITE_REJECTED,
            });
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.INVITE_REJECTED,
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
