const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const { EventlogIt } = require("../../events/eventListener");
const processSubEvents = require("../../../../utils/processSubEvent");
const Post = require("../../../../src/model/user/post/postSchema");
const Event = require("../../../../src/model/user/events/eventSchema").model;
const KnowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
const Vote = require("../../user/post/votes/vote.model").PostVote;
const EventVote = require("../../user/post/votes/vote.model").EventVote;
const GeneralPost = require("./gen-post.model");
const config = require("config");
const {
    ImageUploader,
} = require("../../../../middleware/multipleImagesUploads");
const resizeContainer = require("../../../../middleware/multipleResizeImages");
const auth = require("../../../../middleware/auth");
const checkAdmin = require("../../../../middleware/checkAdmin");
const EventGoings = require("../../../../src/model/user/eventGoings");
const {
    validateUserRole,
} = require("../../generalModules/userGeneralOperations");
const { slug } = require("../../generalModules/general");
const { PostlogIt } = require("../../events/post/postEventListener");
const isVerified = require("../../../../middleware/isVerified");
const knowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const {
    createPostSearchEntry,
    createEventSearchEntry,
} = require("../search/search.general.api");

const sortings = {
    trending: { totalComments: -1 },
    newest: { createdAt: -1 },
    hot: { totalVotes: -1 },
};

var instance = new Post();
// router.route('/post').post([auth, ImageUploader(5, 'event'), resizeContainer], createPost);
router.route("/post").post([auth, multer().none()], createPost);
// router.route('/event').post(createEvent);
router
    .route("/event")
    .post(
        [auth, isVerified, ImageUploader(5, "post") /*, resizeContainer*/],
        createEvent
    );

router.route("/get/all").get(auth, getAllByUser);
router
    .route("/event/action/remove/:ID")
    .delete([auth, checkAdmin], deleteEvent);
// router.route('/post').get(auth, getAllPosts);
router.route("/event/share/to/community").put(auth, shareToCommunity);
router.route("/by/community/:ID").get(auth, getByCommunity);
router.route("/newsfeed").get(auth, getNewsFeed);
router.route("/events/pending/to/approve").get([auth], getPendingEvents);
router.route("/event/approve").put([auth], approveEvent);
router.route("/event/reject").put([auth], rejectEvent);

router.route("/approve/community/post/:ID").put(auth, approveCommunityPost);
router
    .route("/pendingposts/bycommunity/:ID")
    .get(/*auth, */ getPendingPostInCommunity);

// get all events approved

router
    .route("/event/saveas/draft")
    .post(
        [auth, isVerified, ImageUploader(5, "post"), resizeContainer],
        async (req, res) => {
            //createEvent(req, res, 123);
            res.json("not implemented yet, inprogress");
        }
    );

router.route("/post/savedas/draft").get(auth, (req, res) => {
    Post.find({ author: req.user.ID, isPublished: false })
        .then((posts) => {
            res.json({ status: true, data: posts });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
});

router.route("/event/savedas/draft").get(auth, (req, res) => {
    Event.find({ author: req.user.ID, isPublished: false })
        .then((events) => {
            res.status(200).json({ status: true, data: events });
        })
        .catch((error) => {
            res.status(500).json({ status: false, message: error.message });
        });
});

router.route("/hide/event/:ID").put(auth, toggleHideEvent);
router.route("/hide/post/:ID").put(auth, toggleHidePost);

router.route("/event/detail/:ID").get(async (req, res) => {
    const token = req.header("x-auth-token");
    let user = null;
    let decoded;
    if (token) {
        decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        user = await User.findOne({ _id: decoded.ID }, "savedEvents");
    }

    let evGoings = await EventGoings.findOne({
        user: decoded.ID,
        event: req.params.ID,
    });
    //
    Event.findOne({ _id: req.params.ID })
        .lean(true)
        .populate([
            { path: "knowledgeGroup", select: "name slug logo" },
            { path: "author", select: "userName email userImage" },
            { path: "moderators", select: "userName" },
        ])
        .then(async function (event) {
            // //

            if (token) {
                event.isSaved =
                    user.savedEvents.indexOf(event._id) == -1 ? false : true;
                let likeStatus = await getEventLikeStatus(
                    decoded.ID,
                    event._id
                );
                event.isLiked =
                    likeStatus == null
                        ? false
                        : likeStatus.voteType == "up"
                        ? true
                        : false;
                event.isDisLiked =
                    likeStatus == null
                        ? false
                        : likeStatus.voteType == "down"
                        ? true
                        : false;

                event.isModerator = idExistInArray(
                    event.moderators,
                    decoded.ID
                );
                let { subscribedEvents } = await User.findById(
                    { _id: user._id },
                    { subscribedEvents: 1 }
                );
                if (subscribedEvents.length) {
                    //console.log(
                    //     "subscribedEvents.includes(event._id): ",
                    //     subscribedEvents.includes(event._id)
                    // );
                    if (subscribedEvents.includes(event._id)) {
                        event["isSubscribed"] = true;
                    }
                }
            }

            //
            event.comments = [];
            res.json({
                status: true,
                data: { ...event, going: evGoings ? evGoings.action : 0 },
            });
        })
        .catch((error) => {
            //
            res.json(error);
        });
});

router.route("/post/by/tags").get(auth, getPostsByTags);

async function createPost(req, res) {
    // create post
    // add to gen post
    // save
    //

    try {
        const isDraft = !req.body.isPublished;

        let community = await KnowledgeGroup.findOne({
            _id: req.body.knowledgeGroup,
        });
        if (!community) {
            return res
                .status(422)
                .json({ message: "Please Select a Valid Community" });
        }

        let isPublished = community.autoPE;
        let links = req.body.link || [];
        // if (req.body.link) {
        //     req.body.link.map((item) => {
        //         links.push(JSON.parse(item));
        //     });
        // }

        let tags = req.body.tags;
        checkUser = await validateUserRole(req.user.ID);
        if (!checkUser || checkUser === null) {
            return res
                .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                .json({
                    error: CONSTANTS.UNAUTHORIZED,
                    message: CONSTANTS.FORBIDDEN,
                })
                .end();
        }

        const post = {
            title: req.body.title,
            description: req.body.description,
            slug: slug(req.body.title),
            knowledgeGroup: req.body.knowledgeGroup,
            link: links,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
            videoUrl: req.body.videoUrl,
        };

        const { error, value } = instance.validatePost(post);
        if (error) {
            //
            // deleteRequestFiles(req.body.images);
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }

        //new post
        var newPost = new Post({ _id: new mongoose.Types.ObjectId() });
        if (!isPublished && !isDraft) {
            community.pendingPosts.push(newPost._id);
        }

        if (!isDraft) {
            let genPost = new GeneralPost({
                type: 1,
                isPublished: isPublished,
                post: newPost._id,
                postCommunity: req.body.knowledgeGroup,
                author: req.user.ID,
                tags: req.body.tags,
            });
            let savegen = await genPost.save();
            newPost.parentID = genPost._id;
        }

        newPost.title = value.title;
        newPost.videoUrl = value.videoUrl;
        newPost.author = req.user.ID;
        newPost.description = value.description;
        newPost.slug = value.slug;
        newPost.knowledgeGroup = value.knowledgeGroup || null;

        // value.knowledgeGroup === undefined ? req.user.ID : null;
        newPost.image = req.body.images || [];
        newPost.link = value.link || [];
        newPost.tags = value.tags || [];
        //

        newPost.isPublished = isDraft ? false : true; //isPublished; //value.isPublished;

        let saveNewPost = await newPost.save();

        if (isDraft) {
            return res.json({
                message: "Your Post Saved as Draft Successfully.",
            });
        }

        if (req.body.ID) {
            await Post.remove({ _id: req.body.ID });
        }

        if (!isPublished) {
            let savecom = await community.save();
            res.json({
                status: true,
                message:
                    "your post is submitted to community moderator for approval",
            });
        } else {
            eventTrigger(req.user.ID);
            createPostSearchEntry(newPost._id, newPost.title);
            req.user.ID;
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.ADD_SUCCESSFULLY,
                    data: saveNewPost,
                })
                .end();
        }
    } catch (error) {
        console.log(error);
        console.log(console.trace());
        res.status(500).json({ status: false, message: error.message });
    }
}

let eventObject = new Event();
async function deleteEvent(req, res) {
    Event.findOneAndDelete({ _id: req.params.ID })
        .then((doc) => {
            return GeneralPost.findOneAndDelete({ _id: doc.parent });
        })
        .then((removed) => {
            res.json({ message: "Event Removed Successfully" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

async function createEvent(req, res) {
    let _ID = "";
    const isDraft = !req.body.isPublished;
    if (req.body._id) {
        _ID = req.body._id;
        delete req.body._id;
    }

    let links = req.body.link || [];
    // if (req.body.link) {
    //     req.body.link.map((item) => {
    //         links.push(JSON.parse(item));
    //     });
    // }
    if (links.length > 0) {
        if (links[0].title == "" && links[0].url == "") {
            links.splice(0, 1);
        } else if (links[0].title == "" || links[0].url == "") {
            res.status(400).json({
                message: "one of (url or title) cannot be empty",
            });
        }
    }

    req.body.link = links;

    console.log("--------- Event ----------------");
    console.log(req.body);
    console.log("--------- Event ----------------");
    const { error, value } = eventObject.validateEvent(req.body);

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

    if (!isDraft) {
        let genPost = new GeneralPost({
            type: 2,
            event: event._id,
            eventCommunities: [],
            author: req.user.ID,
        });
        event.parentID = genPost._id;
        let saveGen = await genPost.save();
    }

    event.eventName = value.eventName;
    event.date = value.date;
    event.time = value.time || null;
    event.hostedBy = value.hostedBy;
    event.coHostedBy = value.coHostedBy;
    event.description = value.description;
    event.slug = slug(value.eventName);
    event.country = value.country;
    event.city = value.city;
    // event.venue = value.venue;
    event.address = value.address;
    event.contactRsvp = value.contactRsvp || null;
    event.knowledgeGroup = [value.knowledgeGroup] || [];
    event.profile = value.knowledgeGroup === undefined ? req.user.ID : null;
    event.link = value.link || [];
    event.characteristics = value.characteristics || [];
    event.subEvent = processSubEvents(value.subEvent) || [];
    event.author = req.user.ID;
    event.isPublished = value.isPublished;
    event.images = req.body.images || [];
    event.moderators = [req.user.ID];
    event.notifyUser = req.body.notifyUser ? Number(req.body.notifyUser) : 0;

    event.save((err, saveEvent) => {
        //
        if (err) {
            throw err;
        }

        if (isDraft) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({ message: "Saved As Draft Successfully" });
        }

        return res
            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
            .json({
                message: CONSTANTS.ADD_SUCCESSFULLY,
                data: saveEvent,
            })
            .end();
    });
}

async function shareToCommunity(req, res) {
    //
    let event = await Event.findOne({ _id: req.query.event });
    if (!event) {
        res.status(204).json({
            status: false,
            message: "Event does not exist",
        });
    }

    if (event.status == 0 || event.status == 2) {
        res.status(422).json({
            status: false,
            message:
                event.status == 0
                    ? "Even Cannot share to community, Because event is not approved yet "
                    : "Even Cannot share to community, Because event is suspended",
        });
    }

    if (event.status == 1) {
        // let genEvent = await GeneralPost.findOneAndUpdate({_id: req.query.parent}, {$addToSet: { 'eventCommunities': {community:req.query.community, sharedBy: req.user.ID, approved: false}  }});
        let genEvent = await GeneralPost.findOneAndUpdate(
            { _id: req.query.parent },
            { $addToSet: { eventCommunities: req.query.community } }
        );
        Event.findOneAndUpdate(
            { _id: req.query.event, status: 1 },
            { $addToSet: { knowledgeGroup: req.query.community } }
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
}

// Get All (events && posts) by user on its profile
// if user is itself (then get not published also)
async function getAllByUser(req, res) {
    try {
        let ID = req.query.ID || req.user.ID;
        let user = await User.findOne(
            { _id: req.user.ID },
            "savedPosts savedEvents followedTags"
        );
        user.savedPosts = user.savedPosts.map((itm) => itm.toString());
        user.savedEvents = user.savedEvents.map((itm) => itm.toString());

        let userFollowedTags = user.followedTags;
        if (req.query.ID) {
            userfollowedTags = (await User.findOne({ _id: ID }, "followedTags"))
                .followedTags;
        }

        let query = {
            $or: [
                {
                    author: ID,
                },
                {
                    tags: {
                        $in: userFollowedTags,
                    },
                },
            ],
        };

        if (req.query.ID) {
            query = { ...query, isPublished: true, isHidden: false };
        }

        let result = await getPost(
            query,
            req.query.page,
            CONSTANTS.NEWSFEED_PAGE_SIZE
        );

        result.docs = await Promise.all(
            _.map(result.docs, async function (post) {
                if (post.post) {
                    post.post.isSaved =
                        user.savedPosts.indexOf(post.post._id.toString()) == -1
                            ? false
                            : true;
                    let likeStatus = await getLikeStatus(
                        req.user.ID,
                        post.post._id
                    );
                    post.post.isLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "up"
                            ? true
                            : false;
                    post.post.isDisLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "down"
                            ? true
                            : false;
                    // post.post.totalLikes = post.post.upVoteCount - post.post.downVoteCount;
                    let comMods = post.post.knowledgeGroup
                        ? post.post.knowledgeGroup.moderators.map((itm) => {
                              return itm.toString();
                          })
                        : [];
                    post.post.isComMod =
                        comMods.indexOf(req.user.ID) == -1 ? false : true;
                    post.post.comments = [];
                    delete post.post.upVoteCount;
                    delete post.post.downVoteCount;
                }
                if (post.event) {
                    post.event.isSaved =
                        user.savedEvents.indexOf(post.event._id.toString()) ==
                        -1
                            ? false
                            : true;
                    let likeStatus = await getEventLikeStatus(
                        req.user.ID,
                        post.event._id
                    );
                    post.event.knowledgeGroup = transFormCommunities(
                        post.event.knowledgeGroup,
                        req.user.ID
                    );
                    post.event.isLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "up"
                            ? true
                            : false;
                    post.event.isDisLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "down"
                            ? true
                            : false;
                    // post.event.isComMod = false;// _.intersection(userJoinedCommunities, post.event.knowledgeGroup).length == 0 ? false: true;
                    let eventMods = post.event.moderators.map((itm) => {
                        return itm.toString();
                    });
                    post.event.isModerator =
                        eventMods.indexOf(req.user.ID) == -1 ? false : true;
                    delete post.event.upVoteCount;
                    delete post.event.downVoteCount;
                    post.event.comments = [];
                }

                return post;
            })
        );
        res.json({
            status: true,
            data: result,
            isFollowed: user.followedTags.indexOf(req.query.tag) !== -1,
            message: "News Feed",
        });
    } catch (error) {
        //
        res.status(500).json({ status: false, message: error.message });
    }
}

async function getPostsByTags(req, res) {
    try {
        let user = await User.findOne(
            { _id: req.user.ID },
            "savedPosts savedEvents joinedCommunities followedTags"
        );

        let communities = await KnowledgeGroup.find({}).distinct("_id");

        let userJoinedCommunities = _.intersection(
            user.joinedCommunities.map((e) => {
                return e.toString();
            }),
            communities.map((e) => {
                return e.toString();
            })
        );

        let query = {
            isPublished: true,
            isHidden: false,
            tags: { $in: [req.query.tag] },
        };

        let result = await getPost(
            query,
            req.query.page,
            CONSTANTS.NEWSFEED_PAGE_SIZE
        );

        result.docs = await Promise.all(
            _.map(result.docs, async function (post) {
                if (post.post) {
                    post.post.isSaved =
                        user.savedPosts.indexOf(req.user.ID) == -1
                            ? false
                            : true;
                    let likeStatus = await getLikeStatus(
                        req.user.ID,
                        post.post._id
                    );
                    post.post.isLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "up"
                            ? true
                            : false;
                    post.post.isDisLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "down"
                            ? true
                            : false;
                    // post.post.totalLikes = post.post.upVoteCount - post.post.downVoteCount;
                    let comMods = post.post.knowledgeGroup.moderators.map(
                        (itm) => {
                            return itm.toString();
                        }
                    );
                    post.post.isComMod =
                        comMods.indexOf(req.user.ID) == -1 ? false : true;
                    post.post.comments = [];
                    delete post.post.upVoteCount;
                    delete post.post.downVoteCount;
                }

                return post;
            })
        );
        res.json({
            status: true,
            data: result,
            isFollowed: user.followedTags.indexOf(req.query.tag) !== -1,
            message: "News Feed",
        });
    } catch (error) {
        //
        console.log(error);
        console.trace();
        res.status(500).json({ status: false, message: error.message });
    }
}

async function getNewsFeed(req, res) {
    const sort = req.query.sort ? sortings[req.query.sort] : sortings["newest"];
    try {
        let user = await User.findOne(
            { _id: req.user.ID },
            "savedPosts savedEvents joinedCommunities followedTags"
        );

        let communities = await KnowledgeGroup.find({}).distinct("_id");

        let userJoinedCommunities = _.intersection(
            user.joinedCommunities.map((e) => {
                return e.toString();
            }),
            communities.map((e) => {
                return e.toString();
            })
        );

        let query = {
            isPublished: true,
            isHidden: false,
            $or: [
                {
                    postCommunity: { $in: userJoinedCommunities },
                },
                {
                    eventCommunities: { $in: userJoinedCommunities },
                },
                {
                    tags: { $in: user.followedTags },
                },
            ],
        };

        let result = await getPost(
            query,
            req.query.page,
            CONSTANTS.NEWSFEED_PAGE_SIZE,
            sort
        );

        result.docs = await Promise.all(
            _.map(result.docs, async function (post) {
                if (post.post) {
                    post.post.isSaved =
                        user.savedPosts.indexOf(req.user.ID) == -1
                            ? false
                            : true;
                    let likeStatus = await getLikeStatus(
                        req.user.ID,
                        post.post._id
                    );
                    post.post.isLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "up"
                            ? true
                            : false;
                    post.post.isDisLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "down"
                            ? true
                            : false;
                    // post.post.totalLikes = post.post.upVoteCount - post.post.downVoteCount;
                    let comMods = post.post.knowledgeGroup.moderators.map(
                        (itm) => {
                            return itm.toString();
                        }
                    );
                    post.post.isComMod =
                        comMods.indexOf(req.user.ID) == -1 ? false : true;
                    post.post.comments = [];
                    delete post.post.upVoteCount;
                    delete post.post.downVoteCount;
                }
                if (post.event) {
                    post.event.isSaved =
                        user.savedEvents.indexOf(req.user.ID) == -1
                            ? false
                            : true;
                    let likeStatus = await getEventLikeStatus(
                        req.user.ID,
                        post.event._id
                    );
                    post.event.knowledgeGroup = transFormCommunities(
                        post.event.knowledgeGroup,
                        req.user.ID
                    );
                    post.event.isLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "up"
                            ? true
                            : false;
                    post.event.isDisLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "down"
                            ? true
                            : false;
                    // post.event.isComMod = false;// _.intersection(userJoinedCommunities, post.event.knowledgeGroup).length == 0 ? false: true;
                    let eventMods = post.event.moderators.map((itm) => {
                        return itm.toString();
                    });
                    post.event.isModerator =
                        eventMods.indexOf(req.user.ID) == -1 ? false : true;
                    delete post.event.upVoteCount;
                    delete post.event.downVoteCount;
                    post.event.comments = [];
                }

                return post;
            })
        );
        res.json({ status: true, data: result, message: "News Feed" });
    } catch (error) {
        //
        res.status(500).json({ status: false, message: error.message });
    }
}

async function getByCommunity(req, res) {
    const sorting = req.query.sort
        ? sortings[req.query.sort]
        : sortings["newest"];
    let user = await User.findOne(
        { _id: req.user.ID },
        "savedPosts savedEvents joinedCommunities"
    );
    let isJoined =
        user.joinedCommunities.indexOf(req.params.ID) == -1 ? false : true;
    let community = await KnowledgeGroup.findOne(
        { _id: req.params.ID },
        "moderators"
    );
    let moderators = community.moderators.map((itm) => {
        return itm.toString();
    });
    let isMod = moderators.indexOf(req.user.ID) == -1 ? false : true;
    try {
        let query = {
            isPublished: true,
            isHidden: false,
            $or: [
                { postCommunity: req.params.ID },
                { eventCommunities: { $in: [req.params.ID] } },
            ],
        };

        let result = await getPost(
            query,
            req.query.page,
            CONSTANTS.COMMUNITY_POSTS_PAGE_SIZE,
            sorting
        );

        result.docs = await Promise.all(
            _.map(result.docs, async function (post) {
                if (post.post) {
                    post.post.isSaved =
                        user.savedPosts.indexOf(req.user.ID) == -1
                            ? false
                            : true;
                    let likeStatus = await getLikeStatus(
                        req.user.ID,
                        post.post._id
                    );
                    //
                    post.post.isLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "up"
                            ? true
                            : false;
                    post.post.isDisLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "down"
                            ? true
                            : false;
                    post.post.isComMod = isMod || false;
                    post.post.isJoined = isJoined;
                    // post.post.totalLikes = post.post.upVoteCount - post.post.downVoteCount;
                    delete post.post.upVoteCount;
                    delete post.post.downVoteCount;
                }

                if (post.event) {
                    post.event.isJoined = isJoined;
                    post.event.isSaved =
                        user.savedEvents.indexOf(req.user.ID) == -1
                            ? false
                            : true;
                    let likeStatus = await getEventLikeStatus(
                        req.user.ID,
                        post.event._id
                    );
                    post.event.isLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "up"
                            ? true
                            : false;
                    post.event.isDisLiked =
                        likeStatus == null
                            ? false
                            : likeStatus.voteType == "down"
                            ? true
                            : false;

                    let eventMods = post.event.moderators.map((itm) => {
                        return itm.toString();
                    });
                    post.event.isModerator =
                        eventMods.indexOf(req.user.ID) == -1 ? false : true;

                    post.event.isComMod = isMod;
                    let trnsforObj = transFormCommunities(
                        post.event.knowledgeGroup,
                        req.user.ID
                    );
                    post.event.isComMod = isMod;
                    delete post.event.upVoteCount;
                    delete post.event.downVoteCount;
                    post.event.comments = [];
                }
                return post;
            })
        );
        result.docs = sort(result.docs);
        res.status(200).json({
            status: true,
            data: result,
            message: "News Feed",
        });
    } catch (error) {
        //
        res.status(500).json({ status: false, message: error.message });
    }
}

function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].post == null) {
            arr.splice(i, 1);
        } else if (arr[i].type == 1) {
            if (arr[i].post.isPined) {
                let obj = arr[i];
                arr.splice(i, 1);
                arr.unshift(obj);
                break;
            }
        }
    }
    return arr;
}

function getPendingEvents(req, res) {
    Event.find({ status: 0 })
        .populate({ path: "author", select: "userImage userName email" })
        .sort({ createdAt: -1 })
        .then((data) => {
            res.status(200).json({ status: true, data: data });
        })
        .catch((error) => {
            res.status(500).json({ status: false, message: error.message });
        });
}

async function approveEvent(req, res) {
    try {
        let gen = await GeneralPost.findOneAndUpdate(
            { _id: req.query.parentID },
            { eventApproved: 1 },
            { upsert: false }
        );
        let evenupdate = await Event.findOneAndUpdate(
            { _id: req.query.eventID },
            { status: 1 },
            { upsert: false, new: true }
        );
        // send notification to user (Your event, "insert title", has been approved! Here's __ cookie points for your contribution.)
        EventlogIt("event_approved", {
            userID: evenupdate.author,
            eventTitle: evenupdate.eventName,
            acceptedBy: null,
            event: evenupdate._id,
            notificationType: "Event Approved",
            points: evenupdate.subEvent.length >= 1 ? 15 : 10,
        });
        createEventSearchEntry(evenupdate._id, evenupdate.eventName);
        res.status(200).json({
            status: true,
            message: "Successfully approved to community",
        });
    } catch (error) {
        //
        res.status(500).json({
            status: false,
            message: "Internal Server Error, please try again",
        });
    }
}

async function rejectEvent(req, res) {
    try {
        let gen = await GeneralPost.findOneAndUpdate(
            { _id: req.query.parentID },
            { eventApproved: 2 },
            { upsert: false }
        );
        let evenupdate = await Event.findOneAndUpdate(
            { _id: req.query.eventID },
            { status: 2 },
            { upsert: false }
        );
        res.status(200).json({
            status: true,
            message: "Successfully rejected",
        });
    } catch (error) {
        //
        res.status(500).json({
            status: false,
            message: "Internal Server Error, please try again",
        });
    }
}

function getLikeStatus(userID, postID) {
    return Vote.findOne({ userId: userID, postId: postID });
}

function getEventLikeStatus(userID, eventID) {
    return EventVote.findOne({ userId: userID, eventId: eventID });
}

function eventTrigger(userID) {
    PostlogIt("firstPost", {
        ID: userID,
        points: CONSTANTS.FIRST_POST_POINT,
    });
    PostlogIt("TenPost", {
        ID: userID,
        points: CONSTANTS.CREATE_TEN_POST_POINT,
    });
    PostlogIt("TwentyFivePost", {
        ID: userID,
        points: CONSTANTS.CREATE_TWENTY_FIVE_POST_POINT,
    });
    PostlogIt("FiftyPost", {
        ID: userID,
        points: CONSTANTS.CREATE_FIFTY_POST_POINT,
    });
    PostlogIt("HundredPost", {
        ID: userID,
        points: CONSTANTS.CREATE_HUNDRED_POST_POINT,
    });
}

async function toggleHideEvent(req, res) {
    try {
        let event = await Event.findOne({
            _id: req.params.ID,
            author: req.user.ID,
        });
        if (event) {
            event.isHidden = !event.isHidden;
            event
                .save()
                .then((event) => {
                    return GeneralPost.findOneAndUpdate(
                        { event: event._id },
                        { isHidden: event.isHidden },
                        { upsert: false, new: true }
                    );
                })
                .then((gen) => {
                    res.status(200).json({
                        status: true,
                        message: gen.isHidden
                            ? "Hiden successfully"
                            : "Hide toggle successfully",
                    });
                });
        } else {
            res.status(403).json({ message: "forbidden" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

async function toggleHidePost(req, res) {
    try {
        let post = await Post.findOne({
            _id: req.params.ID,
            author: req.user.ID,
        });
        if (post) {
            post.isHidden = !post.isHidden;
            post.save()
                .then((post) => {
                    return GeneralPost.findOneAndUpdate(
                        { post: post._id },
                        { isHidden: post.isHidden },
                        { upsert: false, new: true }
                    );
                })
                .then((gen) => {
                    res.status(200).json({
                        status: true,
                        message: gen.isHidden
                            ? "Hiden successfully"
                            : "Hide toggle successfully",
                    });
                });
        } else {
            res.status(403).json({ message: "forbidden" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

async function approveCommunityPost(req, res) {
    try {
        let post = await Post.findOne({ _id: req.params.ID }).populate(
            "knowledgeGroup"
        );
        let mods = post.knowledgeGroup.moderators;
        if (mods.indexOf(req.user.ID) == -1 && req.user.role != "Admin") {
            return res
                .status(403)
                .json({ status: false, message: "forbidden" });
        }

        post.isPublished = true;
        let genpost = await GeneralPost.findOneAndUpdate(
            { post: req.params.ID },
            { isPublished: true },
            { upsert: false, new: true }
        );
        let com = await KnowledgeGroup.findOneAndUpdate(
            { _id: post.knowledgeGroup._id },
            { $pull: { pendingPosts: req.params.ID } }
        );
        let savepost = await post.save();
        createPostSearchEntry(post._id, post.title);
        let communityUser = await User.find(
            {
                _id: { $ne: post.author },
                joinedCommunities: { $in: [post.knowledgeGroup._id] },
                $or: [
                    { muteNotifications: false },
                    { muteNotifications: { $exists: false } },
                ],
            },
            { _id: 1 }
        ).lean();

        for (let user of communityUser) {
            await EventlogIt("community_post_added", {
                userID: user._id,
                communityName: post.knowledgeGroup.name,
                postTitle: post.title,
                post: req.params.ID,
                notificationType: "isNewPost",
            });
        }

        // send notification that your post approved successfully;
        EventlogIt("community_post_approved", {
            userID: post.author,
            communityName: post.knowledgeGroup.name,
            postTitle: post.title,
            post: req.params.ID,
            notificationType: "isPostApproved",
        });
        eventTrigger(post.author);
        res.json({ status: true, message: "Post approved successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

async function getPendingPostInCommunity(req, res) {
    const totalDocs = (await knowledgeGroup.findOne({ _id: req.params.ID }))
        .pendingPosts.length;
    if (totalDocs === 0) {
        return res.json({
            message: "No pending request founds",
            data: [],
            hasNext: false, // page + 1 < Math.ceil(totalDocs / limit),
            hasPrev: false, // page + 1 > 1,
            totalDocs: totalDocs,
            page: 1,
        });
    }

    const limit = Number(req.query.limit || 10);
    req.query.page = Number(req.query.page);
    const page = req.query.page ? Number(req.query.page) - 1 : 1;
    const skip = page * limit;
    knowledgeGroup
        .aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.ID),
                },
            },
            {
                $unwind: "$pendingPosts",
            },
            // {
            //     $project: {
            //         _id: "$_id",
            //         totalDocs: { $sum: 1 },
            //         pendingPosts: "$pendingPosts",
            //     },
            // },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $group: {
                    _id: "$_id",
                    pendingPosts: { $push: "$pendingPosts" },
                    totalDocs: { $sum: 1 },
                },
            },
        ])
        .then((docs) => {
            return knowledgeGroup.populate(docs, [
                {
                    path: "pendingPosts",
                    select: "title slug images description link image author",
                    populate: [
                        {
                            path: "author",
                            select: "userName",
                        },
                    ],
                },
            ]);
        })
        .then((docs) => {
            return res.json({
                message: "pending posts",
                data: docs[0].pendingPosts,
                hasNext: page + 1 < Math.ceil(totalDocs / limit),
                hasPrev: page + 1 > 1,
                totalDocs: totalDocs,
                page: page + 1,
            });
        })
        .catch((Err) => res.status(500).json({ message: Err.message }));

    /*
    KnowledgeGroup.findOne({ _id: req.params.ID })
        .populate({
            path: "pendingPosts",
            select: "title slug images description link image author",
            populate: {
                path: "author",
                select: "userName userImage email",
            },
        })
        .then((community) => {
            //
            if (
                community.moderators.indexOf(req.user.ID) == -1 &&
                req.user.role != "Admin"
            ) {
                return res
                    .status(403)
                    .json({ status: false, message: "Forbidden" });
            }

            // fs.writeFileSync("testResponse.json", JSON.stringify(community));

            res.status(200).json({
                message: "Posts pending to approval in community",
                data: community.pendingPosts,
            });
        })
        .catch((error) => {
            res.status(500).json({ status: false, message: error.message });
        }); */
}

function getPost(query, __page, page_size, sort) {
    let sorting = sort ? sort : { createdAt: -1 };
    let options = {
        page: __page > 0 ? __page : 1 || 1,
        populate: [
            {
                path: "post",
                populate: [
                    {
                        path: "knowledgeGroup",
                        select: "name logo slug moderators",
                    },
                    {
                        path: "upVoteCount",
                    },
                    {
                        path: "downVoteCount",
                    },
                    {
                        path: "author",
                        select: "userName userImage",
                    },
                    {
                        path: "commentsCount",
                    },
                ],
            },
            {
                path: "event",
                populate: [
                    {
                        path: "knowledgeGroup",
                        select: "name logo slug moderators",
                    },
                    {
                        path: "upVoteCount",
                    },
                    {
                        path: "downVoteCount",
                    },
                    {
                        path: "author",
                        select: "userName userImage",
                    },
                ],
            },
        ],
        lean: true,
        limit: page_size || 10,
        sort: {
            isPined: -1,
            ...sorting,
        },
    };
    return GeneralPost.paginate(query, options);
}

function idExistInArray(arr, id) {
    //
    let status = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id == id) {
            status = true;
            break;
        }
    }
    return status;
}

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

// function processSubEvents(subEvents) {
//     let ses = [];
//     for (let i = 0; i < subEvents.length; i++) {
//         if (subEvents[i].title.trim().length > 0) {
//             ses.push(subEvents[i]);
//         }
//     }
//     return ses;
// }
module.exports = router;

async function findAndUpdateComments() {
    const Comment = require("../post/comment_section/comment/comment.model");
    let postIDS = await Post.distinct("_id");
    let posts = await Promise.all(
        _.map(postIDS, async (item) => {
            let commentCounts = await Comment.countDocuments({ postId: item });
            await GeneralPost.findOneAndUpdate(
                { post: item },
                { $set: { totalComments: commentCounts } },
                { upsert: false, new: true }
            );
        })
    );
}

async function findAndUpdateVotes() {
    let posts = await Post.find({}, "totalComments totalVotes");
    console.log(posts);
    Promise.all(
        _.map(posts, async (item) => {
            try {
                await GeneralPost.update(
                    { post: item._id },
                    {
                        $set: {
                            totalVotes: item.totalVotes,
                            totalComments: item.totalComments,
                        },
                    }
                );
            } catch (error) {
                console.log(error);
            }
        })
    );
}

router.route("/check/post").get(function (req, res) {
    const page = Number(req.query.page || 1) - 1;
    const limit = Number(req.query.limit || 10);

    console.log(" testing page ...", page, limit);
    Post.paginate({}, { skip: page * 10, limit, select: "tags" })
        .then((docs) => {
            res.json(docs);
        })
        .catch((Err) => res.json({ message: Err.message }));
});

async function findandlist() {
    try {
        let ids = await Post.distinct("_id");
        let data = await knowledgeGroup.update(
            {},
            { $pull: { pendingPosts: { $nin: ids } } },
            { multi: true }
        );
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// findandlist();
