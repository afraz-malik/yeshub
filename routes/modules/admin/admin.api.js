const router = require("express").Router();

const User = require("../../../src/model/user/userSchema");
const Post = require("../../../src/model/user/post/postSchema");
const Event = require("../../../src/model/user/events/eventSchema").model;
const GenPost = require("../user/GenPost/gen-post.model");
const Report = require("../user/reports/reports.model");
const checkAdmin = require("../../../middleware/checkAdmin");
const knowledgeGroup = require("../../../src/model/knowledgeGroup/knowledgeGroup");

// reject post & delete post are same thing.
// this api endpoint called from admin panel when a admin/moderator reject a post.
router.route("/delete/post/:ID").delete(checkCommunityMod, deletePost);

router.route("/delete/event/:ID").delete(checkAdmin, deleteEvent);
router.route("/delete/user/:ID").delete(checkAdmin, deleteUser);
router.route("/delete/report/:ID").delete(checkAdmin, deleteReport);

async function deletePost(req, res) {
    try {
        let delpost = await Post.findOneAndRemove({ _id: req.params.ID });
        let delgen = await GenPost.findOneAndRemove({ post: req.params.ID });
        res.json({ message: "Post Deleted successfully", status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
}

async function deleteEvent(req, res) {
    try {
        let delpost = await Event.findOneAndRemove({ _id: req.params.ID });
        let delgen = await GenPost.findOneAndRemove({ event: req.params.ID });
        res.json({ message: "Event Deleted successfully", status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
}

async function deleteUser(req, res) {
    try {
        let delUser = await User.findOneAndRemove({ _id: req.params.ID });
        let delposts = await Post.remove({ author: req.params.ID });
        let delevents = await Event.remove({ author: req.params.ID });
        let delgen = await GenPost.remove({ author: req.params.ID });
        res.json({
            message: "User and all his posts and events deleted permanently",
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
}

function deleteReport(req, res) {
    Report.findOneAndDelete({ _id: req.params.ID })
        .then((report) => {
            res.json({ status: true, message: "Report deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ status: false, message: error.message });
        });
}

async function checkCommunityMod(req, res, next) {
    if (req.user.role.toLowerCase() === "admin") {
        return next();
    }

    const postID = req.params.ID;
    const post = await Post.findOne({ _id: postID }, "");
    const communityID = post.knowledgeGroup;
    const community = await knowledgeGroup.findOne(
        { _id: communityID },
        "moderators"
    );
    const index = community.moderators.indexOf(req.user.ID);
    console.log(
        "Testing : ",
        index,
        req.user.ID,
        community.moderators,
        index !== -1
    );
    if (index !== -1) {
        return next();
    } else {
        return res.status(401).json({ message: "Un Authorized" });
    }
}

module.exports = router;
