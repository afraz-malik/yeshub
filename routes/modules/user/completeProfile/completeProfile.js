const express = require("express");
const router = express.Router();
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
const Post = require("../../../../src/model/user/post/postSchema");
const Award = require("../../../../src/model/awardSchema");
const Event = require("../../../../src/model/user/events/eventSchema").model;
const { func } = require("joi");
router.get("/get", async (req, res) => {
    var query = { _id: req.user.ID };

    User.findOne(query)
        .select({
            progressBar: 1,
            achievements: 1,
            metaInfo: 1,
            otherInfo: 1,
            PersonalStatement: 1,
            userImage: 1,
            points: 1,
            joinedCommunities: 1,
            savedPosts: 1,
            userName: 1,
            email: 1,
            muteNotifications: 1,
            receivedAward: 1,
            awardGiven: 1,
        })
        .populate([
            {
                path: "savedPosts",
                model: Post,
                select: {
                    _id: 1,
                    description: 1,
                    image: 1,
                    likes: 1,
                    disliskes: 1,
                    isPublished: 1,
                    title: 1,
                    slug: 1,
                },
            },
            {
                path: "joinedCommunities",
                model: Knowledge,
                select: {
                    _id: 1,
                    description: 1,
                    logo: 1,
                    coverImage: 1,
                    likes: 1,
                    disliskes: 1,
                    published: 1,
                    name: 1,
                    slug: 1,
                },
            },
        ])
        .then(async function (result) {
            try {
                let postLikesScore = await postsLikeScore(req.user.ID);
                let eventsScore = await calcEventScore(req.user.ID);
                let receivedAward = await getAwards(result._doc.receivedAward);
                let awardGiven = await getAwards(result._doc.awardGiven);
                result._doc.points += postLikesScore + eventsScore;
                result._doc.awardGiven = awardGiven;
                result._doc.receivedAward = receivedAward;
            } catch (error) {
                throw error;
            }

            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.USER_FOUND,
                    data: {
                        ...result._doc,
                        ...{ emailStatus: result._doc.progressBar.email },
                    },
                })
                .end();
        })
        .catch((err) => {
            console.log("err: ", err);
            res.status(500).json({ status: false, message: err.message });
        });
});

// get users profile by ID
router.get("/get/:ID", async (req, res) => {
    var query = { _id: req.params.ID };

    User.findOne(query)
        .select({
            // progressBar: 1,
            // achievements: 1,
            // metaInfo: 1,
            // otherInfo: 1,
            PersonalStatement: 1,
            userImage: 1,
            points: 1,
            // joinedCommunities: 1,
            // savedPosts: 1,
            userName: 1,
            email: 1,
            // muteNotifications: 1,
            receivedAward: 1,
            // awardGiven: 1,
        })
        .populate([
            // {
            //     path: "savedPosts",
            //     model: Post,
            //     select: {
            //         _id: 1,
            //         description: 1,
            //         image: 1,
            //         likes: 1,
            //         disliskes: 1,
            //         isPublished: 1,
            //         title: 1,
            //         slug: 1,
            //     },
            // },
            // {
            //     path: "joinedCommunities",
            //     model: Knowledge,
            //     select: {
            //         _id: 1,
            //         description: 1,
            //         logo: 1,
            //         coverImage: 1,
            //         likes: 1,
            //         disliskes: 1,
            //         published: 1,
            //         name: 1,
            //         slug: 1,
            //     },
            // },
        ])
        .then(async function (result) {
            try {
                let postLikesScore = await postsLikeScore(req.params.ID);
                let eventsScore = await calcEventScore(req.params.ID);
                let receivedAward = await getAwards(result._doc.receivedAward);
                // let awardGiven = await getAwards(result._doc.awardGiven);
                result._doc.points += postLikesScore + eventsScore;
                // result._doc.awardGiven = awardGiven;
                result._doc.receivedAward = receivedAward;
            } catch (error) {
                throw error;
            }

            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.USER_FOUND,
                    data: {
                        ...result._doc,
                        // ...{ emailStatus: result._doc.progressBar.email },
                    },
                })
                .end();
        })
        .catch((err) => {
            console.log("err: ", err);
            res.status(500).json({ status: false, message: err.message });
        });
});

router.post("/muteNotifications", async (req, res) => {
    if (!req.user.ID) {
        res.status(404).json({ message: "User not found", data: null }).end();
    }

    let user = await User.findById({ _id: req.user.ID });
    if (user) {
        let updated = await User.findOneAndUpdate(
            { _id: req.user.ID },
            { $set: req.body },
            { new: true }
        ).lean();

        if (updated) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.USER_FOUND,
                    data: {
                        ...updated,
                    },
                })
                .end();
        }
    }
    res.status(500).json({ status: false, message: err.message });
});

async function calc(userID) {
    // events score
    // posts score
    // comments score
    // profile updated score
    // email approved score
    try {
        let postLikesScore = await postsLikeScore(userID);
        let eventsScore = await calcEventScore(userID);
        // let commentScore = await calcCommentScore(userID);

        return postLikesScore + eventsScore;
    } catch (error) {}

    // return score;
}

async function postsLikeScore(userID) {
    let score = 0;

    let posts = await Post.find({ author: userID }, "totalVotes");
    posts.forEach((post) => {
        let points = calc(post.totalVotes);
        score += points;
    });
    return score;
}

async function calcEventScore(userID) {
    let score = 0;
    let events = await Event.find({ author: userID, status: 1 }, "subEvent");
    events.forEach((event) => {
        if (event.subEvent && event.subEvent.length > 0) {
            score += 15;
        } else {
            score += 10;
        }
    });

    return score;
}

function calc(_points) {
    let points = 0;
    if (_points == 0) {
        points = 0;
    } else if (_points > 0 && _points <= 25) {
        points = 5;
    } else if (_points > 25 && _points <= 50) {
        points = 10;
    } else if (_points > 50 && _points <= 100) {
        points = 20;
    } else if (_points > 100 && _points <= 200) {
        points = 50;
    } else if (_points > 200 && _points <= 500) {
        points = 125;
    } else if (_points > 500) {
        points = 125 + Math.floor((_points - 500) / 50) * 5;
    }
    return points;
}

async function getAwards(awardsId) {
    let awards = await Award.find({ _id: { $in: awardsId } });
    let arr = [];
    for (let id of awardsId) {
        let award = awards.find((a) => a._id == id);
        if (award) {
            arr.push(award);
        }
    }

    return arr;
}

module.exports = router;
