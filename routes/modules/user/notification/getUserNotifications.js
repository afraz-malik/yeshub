const express = require("express");
const router = express.Router();
const Post = require("../../../../src/model/user/post/postSchema");
const knowledgeSchema = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
const Notification = require("../../../../src/model/notification/notificationSchema");
const { validateID } = require("../../generalModules/general");
//get user all notifications 
router.get("/get", async (req, res) => {
    var query = {
        $or: [{ userID: req.user.ID }, { admin: req.user.ID }],
        // userID: req.user.ID,
        // isRead: false,
    };
    var options = {
        sort: { createdAt: -1 },
        populate: [
            {
                path: "person",
                model: User,
            },
            {
                path: "post",
                model: Post,
            },
            {
                path: "community",
                model: knowledgeSchema,
            },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };
    Notification.paginate(query, options)
        .then(async function (result) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.NOTIFICATION_LIST,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});
/**
 * {{params }} actionPerformed: boolean
 */
router.put("/read", async (req, res) => {
    console.log(':READ', req.body);
    console.log(req.query.ID)
    if (validateID(req.query.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    var query = {
        _id: req.query.ID,
    };
    Notification.updateOne(query, {
        $set: {
            isRead: true,
            actionPerformed: req.body.actionPerformed 
        },
    })
        .then(async function (result) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.MARK_READ,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

router.post("/readAll", async (req, res) => {
    var query = {
        $or: [{ userID: req.user.ID }, { admin: req.user.ID }],
    };
    Notification.updateMany(query, {
        $set: {
            isRead: true,
        },
    })
        .then(async function (result) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.MARK_READ_ALL,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = router;
