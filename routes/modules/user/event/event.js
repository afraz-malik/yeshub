const express = require("express");
const router = express.Router();
const Event = require("../../../../src/model/user/events/eventSchema").model;
const { slug, validateID } = require("../../generalModules/general");
//middleware
const isVerified = require("../../../../middleware/isVerified");
const mongoose = require("mongoose");
const User = require("../../../../src/model/user/userSchema");

const { EventlogIt } = require("../../events/eventListener");
const CheckAdmin = require("../../../../middleware/checkAdmin");
let { ImageUploader } = require("../../../../middleware/multipleImagesUploads");
let resizeContainer = require("../../../../middleware/multipleResizeImages");
const knowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const GenPost = require("../GenPost/gen-post.model");

const EventGoings = require("../../../../src/model/user/eventGoings");
const processSubEvents = require("../../../../utils/processSubEvent");
var eventObject = new Event();

// this is not in use (gen-post.api.js is used to create event insted)
router.post("/add", isVerified, (req, res) => {
    console.log("---- New Event Creation -----");
    console.log(req.body);

    const { error, value } = eventObject.validateEvent(req.body);
    console.log(value);
    console.log("---- New Event Creation -----");
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }

    let event = new Event();
    event.eventName = value.eventName;
    event.date = value.date;
    if (value.time) {
        event.time.startTime = value.time.startTime || null;
        event.time.endTime = value.time.endTime || null;
    }
    event.hostedBy = value.hostedBy;
    event.coHostedBy = value.coHostedBy;
    event.description = value.description;
    event.slug = slug(value.eventName);
    event.country = value.country;
    event.city = value.city;
    // event.venue = value.venue;
    event.address = value.address;
    event.contactRsvp = value.contactRsvp || null;
    event.knowledgeGroup = value.knowledgeGroup || null;
    event.profile = value.knowledgeGroup === undefined ? req.user.ID : null;
    event.link = value.link || [];
    event.characteristics = value.characteristics || [];
    event.subEvent = value.subEvent || [];
    event.author = req.user.ID;
    event.isPublished = value.isPublished || true;
    event.notifyUser = value.notifyUser || 0;
    event.save((err, saveEvent) => {
        if (err) {
            throw err;
        }
        return res
            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
            .json({
                message: CONSTANTS.ADD_SUCCESSFULLY,
                data: saveEvent,
            })
            .end();
    });
});

router
    .route("/add/image")
    .post(
        [isVerified, ImageUploader(5, "post"), resizeContainer],
        addImageToEvent
    );
function addImageToEvent(req, res) {
    if (req.images.length == 0) {
        res.status().json({ message: "please add images" });
    }

    let images = req.images;
    Event.findOne({ _id: req.params.ID })
        .then((even) => {
            event.images = [event.images, ...images];
            event.save().then((event) => {
                res.status(201).json({
                    message: "Added Images succssfully",
                    images: images,
                });
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}
//update event
router.put("/update", [isVerified, ImageUploader(5, "post")], (req, res) => {
    let communities = [];
    if (req.body.knowledgeGroup) {
        communities = req.body.knowledgeGroup.filter((itm) => {
            itm != "null";
        });
    }

    req.body.knowledgeGroup = communities;
    req.body.subEvent = processSubEvents(req.body.subEvent);
    const { error, value } = eventObject.validateEventEdit(req.body);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }

    Event.findOneAndUpdate(
        { _id: req.body._id },
        {
            $set: value,
        },
        { upsert: false, new: true }
    )
        .then((result) => {
            if (result === null) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.NOT_EXIST,
                    })
                    .end();
            }

            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.UPDATED_SUCCESSFULLY,
                    delete: result,
                })
                .end();
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

//delete post
router.delete("/delete/:eventID", async (req, res) => {
    // check if you are author of event;
    try {
        let event = await Event.findOneAndRemove({
            _id: req.params.eventID,
            moderators: { $in: [req.user.ID] },
        });
        if (event) {
            let gen = await GenPost.remove({ event: req.params.eventID });
            res.status(200).json({
                status: true,
                message: "Event Deleted successfully",
            });
        } else {
            res.status(403).json({ status: false, message: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

router.delete("/remove/from/community/:comID/:eventID", async (req, res) => {
    let communty = await knowledgeGroup.findOne(
        { _id: req.params.comID },
        "moderators"
    );
    let mods = communty.moderators.map((itm) => {
        return itm.toString();
    });
    if (mods.indexOf(req.user.ID) != -1) {
        let ev = await Event.findOneAndUpdate(
            { _id: req.params.eventID },
            { $pull: { knowledgeGroup: req.params.comID } },
            { upsert: false, new: true }
        );
        let gen = await GenPost.findOneAndUpdate(
            { event: req.params.eventID },
            { $pull: { eventCommunities: req.params.comID } },
            { upsert: false, new: true }
        );
        res.status(200).json({
            status: true,
            message: "removed from communiity",
        });
    } else {
        res.status(403).json({ status: false, message: "forbidden" });
    }
});

// get all events approved
router.route("/get/all/approved").get(async (req, res) => {
    let user = await User.findOne({ _id: req.user.ID }, "savedEvents");
    let evGoings = await EventGoings.find({ user: req.user.ID });
    let options = {
        page: req.query.page ? req.query.page : 1 || 1,
        limit: 120,
        populate: [
            { path: "knowledgeGroup", select: "name slug logo moderators" },
            { path: "author", select: "userName email userImage" },
        ],
        lean: true,
    };
    Event.paginate({ status: 1, isHidden: false }, options)
        .then((data) => {
            data.docs.forEach((event) => {
                if (event.knowledgeGroup[0] == null) {
                    event.knowledgeGroup.splice(0, 1);
                }
                let eg = getActionFromEventGoings(event._id, evGoings);
                let mods = event.moderators.map((itm) => {
                    return itm.toString();
                });
                event.going = eg ? eg.action : -1;
                event.isModerator =
                    mods.indexOf(req.user.ID) == -1 ? false : true;
                event.isSaved =
                    user.savedEvents.indexOf(event._id) == -1 ? false : true;
                event.knowledgeGroup = transFormCommunities(
                    event.knowledgeGroup,
                    req.user.ID
                );
            });
            res.json({
                status: true,
                data: data,
                message: "Get all events approved",
            });
        })
        .catch((error) => {
            res.json(error);
        });
});

// get all events by me
router.route("/get/all").get(async (req, res) => {
    const ID = req.query.ID || req.user.ID;

    let options = {
        page: req.query.page ? req.query.page : 1 || 1,
        populate: [
            { path: "knowledgeGroup", select: "name slug logo moderators" },
            { path: "author", select: "userName email userImage" },
        ],
        lean: true,
    };
    try {
        let user = await User.findOne(
            { _id: req.user.ID },
            { savedEvents: 1, subscribedEvents: 1 }
        );

        let evGoings = await EventGoings.find({ user: req.user.ID });
        let query = { author: ID };
        if (req.query.ID) {
            query = { ...query, isPublished: true };
        }
        console.log("---- query event ---------");
        console.log(query);
        console.log("---- query event ---------");
        Event.paginate(query, options)
            .then((result) => {
                result.docs.map((event) => {
                    let eg = getActionFromEventGoings(event._id, evGoings);
                    event.going = eg ? eg.action : -1;
                    event.isModerator = true;
                    event.isSaved =
                        user.savedEvents.indexOf(event._id) == -1
                            ? false
                            : true;
                    event.knowledgeGroup = transFormCommunities(
                        event.knowledgeGroup,
                        req.user.ID
                    );
                    if (user.subscribedEvents.includes(event._id)) {
                        event["isSubscribed"] = true;
                    }
                });
                res.json(result);
            })
            .catch((error) => {
                res.json(error);
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.route("/get/byuser/:id").get(getByUser);
function getByUser(req, res) {
    let query = { author: req.params.id };
    res.json(query);
    let options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: "knowledgeGroup", select: "name slug description logo" },
            { path: "author", select: "name userName userImage" },
        ],
    };
    Event.paginate({}, options)
        .then((events) => {
            res.status(200).json({
                status: true,
                data: events,
                message:
                    events.length > 0
                        ? events.docs.length + "Found Events"
                        : "No event found",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/get/bycommunity/:id").get(getByCommunity);
function getByCommunity(req, res) {
    let query = { knowledgeGroup: { $in: [req.params.id] } };

    let options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: "knowledgeGroup", select: "title description logo" },
            { path: "author", select: "name userName userImage" },
        ],
    };
    Event.paginate(query, options)
        .then((events) => {
            res.status(200).json({
                status: true,
                data: events,
                message:
                    events.length > 0
                        ? events.docs.length + "Found Events"
                        : "No event found",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/share/to/community/:ID").put(shareToCommunity);
function shareToCommunity(req, res) {
    // console.log(req.body.community);
    Event.findOneAndUpdate(
        { _id: req.params.ID },
        { $push: { knowledgeGroup: req.body.community } }
    )
        .then((data) => {
            res.status(200).json({
                status: true,
                message: "Event Successfully Shared To Community ",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/get/filter").get(filterEvents);
function filterEvents(req, res) {
    let query = {};
    // console.log(req.query);
    if (req.query["characteristics"]) {
        query["characteristics"] = { $in: [query["characterisitcs"]] };
    }

    if (req.query["startDate"] && req.query["startDate"] != "undefined") {
        query["date.startDate"] = { $gte: req.query["startDate"] };
    }
    if (req.query["endDate"] && req.query["endDate"] != "undefined") {
        query["date.endDate"] = { $lte: req.query["endDate"] };
    }

    let options = {
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
        populate: [
            { path: "knowledgeGroup", select: "title description logo" },
            { path: "author", select: "name userName userImage" },
        ],
    };

    Event.paginate({}, options)
        .then((events) => {
            res.status(200).json({
                status: true,
                data: events,
                message:
                    events.length > 0
                        ? events.docs.length + "Found Events"
                        : "No event found",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/subevent/add/:id").post(addSubEvent);
async function addSubEvent(req, res) {
    try {
        let event = await Event.findOne({ _id: req.params.id });
        if (event.moderators.indexOf(req.user.ID) == -1) {
            res.status(403).json({
                status: false,
                message: "Unauthorized, you cannot add subevent",
            });
        }

        req.body._id = new mongoose.Types.ObjectId();
        let subevent = await Event.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { subEvent: req.body } },
            { upsert: false }
        );
        res.status(201).json({
            status: true,
            data: req.body,
            message: "sub event added successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: req.body,
        });
    }
}

router.route("/subevent/remove/:id").delete(removeSubEvent);
async function removeSubEvent(req, res) {
    try {
        let event = await Event.findOne({ _id: req.params.id });
        if (event.moderators.indexOf(req.user.ID) == -1) {
            res.status(403).json({
                status: false,
                message: "Unauthorized, you cannot remove subevent",
            });
        }
        Event.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { _id: req.query.subevent } },
            { upsert: false, new: true }
        ).then((data) => {
            res.status(200).json({
                status: true,
                message: "removed sub event successfully",
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
}

router.route("/search/user").get(searchUser);
async function searchUser(req, res) {
    let event = await Event.findOne(
        { _id: req.query.eventID },
        "invited moderators inviteRejected"
    );
    let mods = [];
    if (event) {
        mods = event.moderators;
        rmods = event.inviteRejected;
        inv = event.invited;
    }

    var regex = new RegExp(req.query.search, "i");
    User.find({ $or: [{ userName: regex }, { email: regex }] })
        .select("userName email userImage")
        .limit(10)
        .lean(true)
        .then((users) => {
            users = users.map((user) => {
                user.isModerator = mods.indexOf(user._id) == -1 ? false : true;
                user.isModDeclined =
                    rmods.indexOf(user._id) == -1 ? false : true;
                user.isInvited = inv.indexOf(user._id) == -1 ? false : true;
                return user;
            });
            res.json({ status: true, body: users, count: users.length });
        })
        .catch((error) => res.json(error));
}

router.route("/add/moderator/:id").put(addModToEvent);
async function addModToEvent(req, res) {
    let event = await Event.findOne({
        _id: req.params.id,
        author: req.user.ID,
    });
    if (!event) {
        res.status(400).json({
            status: false,
            message:
                "You cannot add moderator, Because either event does not exist or you are not a author of event",
        });
    }

    if (event.moderators.indexOf(req.query.userID) == -1) {
        event.moderators.push(req.query.userID);
    } else {
        res.status(409).json({
            status: false,
            message: "User is already a moderator",
        });
    }

    // console.log(event.moderators);
    event
        .save()
        .then((data) => {
            // console.log(data.moderators);
            res.status(200).json({
                status: true,
                message: "Moderator added successfully",
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal Server Error, please try again later",
            });
        });
}

router.route("/unmark/as/featured/:ID").put(CheckAdmin, UnMarkEventAsFeatured);
async function UnMarkEventAsFeatured(req, res) {
    Event.findOneAndUpdate(
        { _id: req.params.ID },
        { isFeatured: 0 },
        { upsert: false }
    )
        .then((event) => {
            res.status(200).json({
                status: true,
                message: "Succesfully unmarked featured event",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/mark/as/featured/:ID").put(CheckAdmin, MarkEventAsFeatured);
async function MarkEventAsFeatured(req, res) {
    let featuredEvents = await Event.countDocuments({ isFeatured: 1 });
    if (featuredEvents > 3) {
        throw new Error(
            "Limit already reached to three, more feature events not allowed"
        );
    }
    Event.findOneAndUpdate(
        { _id: req.params.ID },
        { isFeatured: 2 },
        { upsert: false }
    )
        .then((event) => {
            res.status(200).json({
                status: true,
                message: "Succesfully marked as featured event",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/request/for/featured/:ID").put(requestForFeaturedEvent);
async function requestForFeaturedEvent(req, res) {
    let featuredEvents = await Event.countDocuments({ isFeatured: 1 });
    if (featuredEvents > 3) {
        throw new Error(
            "Limit already reached to three, more feature events not allowed"
        );
    }
    Event.findOneAndUpdate({ _id: req.params.ID }, { isFeatured: 1 })
        .then((event) => {
            res.status(200).json({
                status: true,
                message:
                    "Your request submitted for featured event successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router
    .route("/approve/for/featured/:ID")
    .put(CheckAdmin, approveForFeaturedEvent);
async function approveForFeaturedEvent(req, res) {
    Event.findOneAndUpdate({ _id: req.params.ID }, { isFeatured: 2 })
        .then((event) => {
            res.status(200).json({
                status: true,
                message: "Succesfully approved event as featured event",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router
    .route("/reject/for/featured/:ID")
    .put(CheckAdmin, rejectForFeaturedEvent);
async function rejectForFeaturedEvent(req, res) {
    Event.findOneAndUpdate({ _id: req.params.ID }, { isFeatured: 3 })
        .then((event) => {
            res.status(200).json({
                status: true,
                message: "Featured Event request rejected successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/inivte/user/for/mod").post(inviteUSerForMod);
async function inviteUSerForMod(req, res) {
    let user = await User.findOne({ _id: req.user.ID }, "userName");
    let event = await Event.findOne({ _id: req.body.eventID }, "invited");
    if (event.invited.indexOf(req.user.ID) != -1) {
        res.status(400).json({
            status: false,
            message: "user already invited to event moderatorship",
        });
    }
    // console.log("user : ", user);
    Event.findOneAndUpdate(
        { _id: req.body.eventID },
        { $addToSet: { invited: req.body.userID } },
        { upsert: false, new: true }
    )
        .then((event) => {
            EventlogIt("event_invitation", {
                userID: req.body.userID,
                eventTitle: event.eventName,
                invitedBy: user,
                notificationType: "Event Invitation",
                event: req.body.eventID,
            });
            res.status(200).json({
                status: true,
                message: "Successfully invited user for event moderatorship",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/accept/invitation/:ID").put(acceptInvitation);
async function acceptInvitation(req, res) {
    let user = await User.findOne({ _id: req.user.ID });
    // console.log(
    //     "param ID",
    //     req.params.ID,
    //     "user ID",
    //     req.user.ID,
    //     "USER:",
    //     user
    // );
    Event.findOneAndUpdate(
        { _id: req.params.ID },
        { $pull: { invited: req.user.ID }, $push: { moderators: req.user.ID } },
        { upsert: false, new: true }
    )
        .then((event) => {
            EventlogIt("event_accepted", {
                userID: event.author,
                eventTitle: event.eventName,
                acceptedBy: user,
                notificationType: "Event Invitation Accepted",
            });
            // console.log(
            //     "invited:",
            //     event.invited,
            //     " moderators: ",
            //     event.moderators
            // );
            res.status(200).json({
                status: true,
                message: "successfully accepted invitation",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

// reject invitation
router.route("/reject/invitation/:ID").put(rejectInvitation);
async function rejectInvitation(req, res) {
    let user = await User.findOne({ _id: req.user.ID });
    Event.findOneAndUpdate(
        { _id: req.params.ID },
        {
            $pull: { invited: req.user.ID },
            $push: { inviteRejected: req.user.ID },
        },
        { upsert: false, new: true }
    )
        .then((event) => {
            EventlogIt("event_rejected", {
                userID: event.author,
                eventTitle: event.eventName,
                rejectedBy: user,
                event: req.params.ID,
                notificationType: "Event Invitation Rejected",
            });

            res.status(200).json({
                status: true,
                message: "successfully rejected invitation",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/get/pending/featured").get(CheckAdmin, getPendingFeaturedEvents);
function getPendingFeaturedEvents(req, res) {
    let options = {
        page: req.query.page ? req.query : 1 || 1,
        populate: [
            { path: "knowledgeGroup", select: "name slug logo" },
            { path: "author", select: "userName email userImage" },
        ],
    };
    Event.paginate({ isFeatured: 1 }, options)
        .then((result) => res.status(200).json({ status: true, data: result }))
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/remove/mod/:ID").put(removeMod);
async function removeMod(req, res) {
    Event.findOneAndUpdate(
        { _id: req.params.ID },
        { $pull: { moderators: req.query.userID } }
    )
        .then((event) => {
            res.status(200).json({
                status: true,
                message: "user removed successfully from moderatorship",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/search").get(searchEvent);
router.route("/advance/search").get(searchAdvanceEvent);
let name = "'khalid'";
// console.log("original", name);
// console.log("transformed", name.replace("/'", ""));
// console.log(name);
function searchEvent(req, res) {
    let populate = [
        { path: "author", select: "userName userImage email" },
        { path: "knowledgeGroup", select: "name description slug logo" },
    ];

    // console.log(req.query);
    var regex = new RegExp(req.query.search, "i");
    Event.find({
        $or: [{ eventName: regex }, { description: regex }, { country: regex }],
        status: 1,
        isHidden: false,
    })
        .populate(populate)
        .exec((err, data) => {
            if (err) {
                res.status(500).json({ status: false, message: err.message });
            } else {
                console.log("searched data", data);
                res.status(200).json({ status: true, data: data });
            }
        });
    // .catch(error => res.status(500).json({status: false, message: error.message}))
}

async function searchAdvanceEvent(req, res) {
    const { user } = req;
    let query = { status: 1, isHidden: false };
    let populate = [
        { path: "author", select: "userName userImage email" },
        { path: "knowledgeGroup", select: "name description slug logo" },
    ];

    if (req.query.startDate) {
        query["date.startDate"] = { $gte: req.query.startDate };
    }

    if (req.query.endDate) {
        query["date.endDate"] = { $lte: req.query.endDate };
    }
    // console.log(req.query);
    if (req.query.characteristics) {
        query.characteristics = { $in: req.query.characteristics };
    }
    if (req.query.country) {
        query["$text"] = { $search: req.query.country };
    }

    let evGoings = await EventGoings.find({ user: req.user.ID });

    Event.find(query)
        .populate(populate)
        .lean(true)
        .sort({
            "date.startDate": 1,
        })
        .then(async (events) => {
            let { subscribedEvents = [] } = await User.findById(
                { _id: user.ID },
                { subscribedEvents: 1 }
            );

            let evnts = events.map((e) => {
                if (subscribedEvents.includes(e._id)) {
                    e["isSubscribed"] = true;
                }

                let eg = getActionFromEventGoings(e._id, evGoings);

                // e["going"] = eg ? eg.action : -1;
                return { ...e, going: eg ? eg.action : -1 };
            });

            res.status(200).json({
                status: true,
                data: evnts,
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

router.route("/subscribed").post(subscribedEvent);
async function subscribedEvent(req, res) {
    const going = Number(req.query.going);
    if (validateID(req.query.ID)) {
        // console.log("invalid ID");
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }

    eventExist = await Event.findOne({ _id: req.query.ID });
    if (!eventExist || eventExist === null) {
        return res
            .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
            .json({
                error: CONSTANTS.BAD_REQUEST,
                message: "Invalid Event ID, Even not exist",
            })
            .end();
    }

    console.log("req.query.ID: ", req.query.ID);
    // subscribed event
    subEvent = await User.findOne({
        _id: req.user.ID,
        subscribedEvents: { $in: [req.query.ID] },
    });
    console.log("subEvent: ", subEvent);
    if (subEvent === null && going > 0) {
        User.updateOne(
            { _id: req.user.ID },
            {
                $addToSet: {
                    subscribedEvents: req.query.ID,
                },
            }
        )
            .then((result) => {
                console.log("result: ", result);

                if (result === null) {
                    return res
                        .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.NOT_EXIST,
                        })
                        .end();
                }
                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: "Event subscribed successfully",
                    })
                    .end();
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
    } else if (going === 0) {
        User.updateOne(
            { _id: req.user.ID },
            {
                $pull: {
                    subscribedEvents: req.query.ID,
                },
            }
        )
            .then((result) => {
                if (result === null) {
                    return res
                        .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.NOT_EXIST,
                        })
                        .end();
                }

                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: "Event Unsubscribed successfully",
                    })
                    .end();
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

//get subscribed events
router.route("/get/subscribed").get(async function (req, res) {
    let user = await User.findOne({ _id: req.user.ID }, "subscribedEvents");
    // console.log(user.subscribedEvents);
    Event.find({ _id: { $in: user.subscribedEvents } })
        .populate([
            { path: "knowledgeGroup", select: "title slug logo" },
            { path: "author", select: "userName userImage" },
        ])
        .lean(true)
        .exec(function (err, docs) {
            if (err) {
                res.status(500).json({ status: false, message: err.message });
            } else {
                docs.forEach((doc) => {
                    doc.isModerator =
                        doc.moderators.indexOf(req.user.ID) == -1
                            ? false
                            : true;
                    doc.isSaved = true;
                });
                res.status(200).json({ status: true, data: docs });
            }
        });
});

router.route("/save").put(saveEvent);

async function saveEvent(req, res) {
    if (validateID(req.query.ID)) {
        // console.log("invalid ID");
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }

    eventExist = await Event.findOne({ _id: req.query.ID });
    if (!eventExist || eventExist === null) {
        return res
            .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
            .json({
                error: CONSTANTS.BAD_REQUEST,
                message: "Invalid Event ID, Even not exist",
            })
            .end();
    }

    savedEvent = await User.findOne({ savedEvents: { $in: [req.query.ID] } }); //;isSaved(req.query.ID, req.user.ID);
    if (savedEvent === null) {
        User.updateOne(
            { _id: req.user.ID },
            {
                $addToSet: {
                    savedEvents: req.query.ID,
                },
            }
        )
            .then((result) => {
                if (result === null) {
                    return res
                        .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.NOT_EXIST,
                        })
                        .end();
                }

                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: "Event saved successfully",
                    })
                    .end();
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
        User.updateOne(
            { _id: req.user.ID },
            {
                $pull: {
                    savedEvents: req.query.ID,
                },
            }
        )
            .then((result) => {
                if (result === null) {
                    return res
                        .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.NOT_EXIST,
                        })
                        .end();
                }

                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: "Event Unsaved successfully",
                    })
                    .end();
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

router.route("/get/saved").get(async function (req, res) {
    let user = await User.findOne({ _id: req.user.ID }, "savedEvents");
    // console.log(user.savedEvents);
    Event.find({ _id: { $in: user.savedEvents } })
        .populate([
            { path: "knowledgeGroup", select: "title slug logo" },
            { path: "author", select: "userName userImage" },
        ])
        .lean(true)
        .exec(function (err, docs) {
            if (err) {
                res.status(500).json({ status: false, message: err.message });
            } else {
                docs.forEach((doc) => {
                    doc.isModerator =
                        doc.moderators.indexOf(req.user.ID) == -1
                            ? false
                            : true;
                    doc.isSaved = true;
                });
                res.status(200).json({ status: true, data: docs });
            }
        });
});

function transFormCommunities(communities, userID) {
    if (communities[0] == null) {
        communities.splice(0, 1);
    }
    let mods = [];
    communities.forEach((itm) => {
        if (itm != null) {
            mods = itm.moderators.map((itm) => {
                return itm.toString();
            });
            itm.isModerator = mods.indexOf(userID) == -1 ? false : true;
        }
    });
    return communities;
}

function getActionFromEventGoings(eventID, eventGoingsArray) {
    let temp = null;
    for (let i = 0; i < eventGoingsArray.length; i++) {
        let obj = eventGoingsArray[i];
        if (obj.event && obj.event.equals(eventID)) {
            temp = obj;
            break;
        }
    }

    return temp;
}
module.exports = router;
