var express = require("express");
var router = express.Router();
var Award = require("../../../../src/model/awardSchema");
var User = require("../../../../src/model/user/userSchema");
const resizeContainer = require("../../../../middleware/multipleResizeImages");
const {
    ImageUploader,
} = require("../../../../middleware/multipleImagesUploads");

const {
    deleteImage,
    deleteRequestFiles,
} = require("../../generalModules/general");

const auth = require("../../../../middleware/auth");
const admin = require("../../../../middleware/checkAdmin");

router.get("/list", async (req, res) => {
    try {
        let awards = await Award.find();
        return res
            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
            .json({
                message: CONSTANTS.AWARD_LIST,
                data: awards,
            })
            .end();
    } catch (error) {
        throw error;
    }
});

router.delete("/remove", [auth, admin], (req, res) => {
    try {
        Award.findOneAndDelete({ _id: req.query.ID })
            .then((docs) => {
                console.log("docs: ", docs);
                res.json({
                    status: true,
                    message: "Award Deleted successfully",
                    data: docs,
                });
            })
            .catch((error) =>
                res.status(500).json({ status: false, message: error.message })
            );
    } catch (error) {
        throw error;
    }
});

router.post(
    "/add",
    [ImageUploader(1, "award"), resizeContainer],
    async (req, res) => {
        let award = new Award();
        const { error, value } = award.validateAward({
            images: [req.body.images[0]],
            awardName: req.body.awardName,
            awardDescription: req.body.awardDescription,
            cost: req.body.cost,
        });

        if (error) {
            deleteRequestFiles(req.body.images);
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }

        award.awardName = req.body.awardName;
        award.awardDescription = req.body.awardDescription;
        award.cost = req.body.cost;
        award.images = req.body.images;

        award.save((err, newAward) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.details[0].message,
                    })
                    .end();
            } else {
                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.ADD_SUCCESSFULLY,
                        data: newAward,
                    })
                    .end();
            }
        });
    }
);

router.post(
    "/update",
    [ImageUploader(1, "award"), resizeContainer],
    async (req, res) => {
        let award = await Award.findById(req.body._id);
        if (award) {
            let image = req.body.images.length
                ? req.body.images[0]
                : award.images[0];
            const { error, value } = new Award().validateAward({
                images: [image],
                awardName: req.body.awardName,
                awardDescription: req.body.awardDescription,
                cost: req.body.cost,
            });

            if (error) {
                deleteRequestFiles(image);
                return res
                    .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                    .json({
                        error: CONSTANTS.JOI_VALIDATION_ERROR,
                        message: error.details[0].message,
                    })
                    .end();
            }

            Award.findOneAndUpdate(
                { _id: req.body._id },
                {
                    $set: value,
                },
                { new: true }
            )
                .then((data) => {
                    res.status(200).json({
                        status: true,
                        data: data,
                        message: "Award updated successfully",
                    });
                })
                .catch((error) =>
                    res
                        .status(500)
                        .json({ status: false, message: error.message })
                );
        } else {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }
    }
);

router.post("/give", async (req, res) => {
    const {
        body: { takerId, point, awardId },
    } = req;
    const { ID } = req.user;
    let award = await Award.findById(awardId);
    if (!award) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: "Not Allowed",
                message: "This award is not available anymore",
            })
            .end();
    }
    let user = await User.findById(ID);
    if (user) {
        if (user._id == takerId) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: "Not Allowed",
                    message: "You can't give award to yourself",
                })
                .end();
        }

        let havePoints = user.points - point;
        if (havePoints < 0) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: "Not enough points",
                    message: "You don't have enough points",
                })
                .end();
        }

        let percent = (point * 4) / 20; //20%

        User.findOneAndUpdate(
            { _id: ID },
            { $push: { awardGiven: awardId }, $set: { points: havePoints } },
            { new: true }
        )
            .then((giver) => {
                User.findOneAndUpdate(
                    { _id: takerId },
                    {
                        $push: { receivedAward: awardId },
                        $inc: { points: percent },
                    },
                    { new: true }
                )
                    .then((taker) => {
                        console.log("taker: ", taker);
                        if (!taker.muteNotifications) {
                            NOTIFICATION.singleNotifyUser({
                                userID: takerId,
                                message: `${giver.userName} send you award`,
                                notificationType:
                                    CONSTANTS.AWARD_RECEIVED_NOTIFI,
                                person: giver._id,
                            });
                        }
                        return res
                            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                            .json({
                                message: "Award has been given successfully",
                                data: taker,
                            })
                            .end();
                    })
                    .catch((err) => {
                        console.log("err: ", err);
                        return res
                            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                            .json({
                                error: CONSTANTS.JOI_VALIDATION_ERROR,
                                message: "something went wrong",
                            })
                            .end();
                    });
            })
            .catch((err) => {
                console.log("err: ", err);
                return res
                    .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                    .json({
                        error: CONSTANTS.JOI_VALIDATION_ERROR,
                        message: "something went wrong",
                    })
                    .end();
            });
    } else {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: "No user found",
            })
            .end();
    }
});

module.exports = router;
