const router = require("express").Router();
const auth = require("../../../middleware/auth");
const userSchema = require("../../../src/model/user/userSchema");
const Tag = require("./tags.model");
const User = require("../../../src/model/user/userSchema");

function searchTags(req, res) {
    var regex = new RegExp(req.query.search, "i");
    Tag.find({ name: regex })
        .limit(10)
        .then((docs) => res.json({ data: docs }))
        .catch((error) => res.status(500).json({ message: error.message }));
}

async function create(req, res) {
    let tag = new Tag({ name: req.body.name });
    let tags = await Tag.find({ name: req.body.name });
    if (tags.length > 0) {
        return res.json({ message: "already exists" });
    }

    tag.save()
        .then((doc) => {
            res.json({ message: "Created Tag Successfully", data: doc });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}

async function toggleFollowTag(req, res) {
    try {
        let user = await User.findOne(
            { _id: req.user.ID },
            { followedTags: 1 }
        );
        console.log("--- checking tags ----");
        console.log(user);
        console.log("--- checking tags ----");
        const index = user.followedTags.indexOf(req.body.tag);
        if (index === -1) {
            await User.findOneAndUpdate(
                { _id: req.user.ID },
                { $addToSet: { followedTags: req.body.tag } },
                { upsert: false }
            );
            return res.json({
                message: "Tag Followed Successfully.",
                isFollowed: true,
            });
        }

        if (index !== -1) {
            await User.findOneAndUpdate(
                { _id: req.user.ID },
                { $pull: { followedTags: req.body.tag } },
                { upsert: false }
            );
            return res.json({
                message: "Tag UNFollowed Successfully.",
                isFollowed: false,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function unFollowTag(req, res) {
    User.findOneAndUpdate(
        { _id: req.user.ID },
        { $pull: { followedTags: req.query.tag } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            res.json({
                message: "Un Followed Successfully.",
                isFollowed: false,
            });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}
router.route("/").post(create);
router.route("/search").get(searchTags);
router.route("/follow").put(auth, toggleFollowTag);
// router.route("/unfollow").put(auth, unFollowTag);

module.exports = router;
