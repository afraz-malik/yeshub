const { search } = require("../user");

const router = require("express").Router();
const Search = require("./search.model");
const Event = require("../../../../src/model/user/events/eventSchema").model;
const Post = require("../../../../src/model/user/post/postSchema");
router.route("/yeshub").get(searchYeshub);

function searchYeshub(req, res) {
    var regex = new RegExp(req.query.search, "i");
    Search.find({ title: regex })
        .populate([
            {
                path: "post",
                select: "title author",
                populate: {
                    path: "author",
                    select: "userName userImage",
                },
            },
            {
                path: "event",
                select: "eventName author",
                populate: {
                    path: "author",
                    select: "userName userImage",
                },
            },
        ])
        .limit(10)
        .then((docs) => {
            res.json({ data: docs });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
}

async function loadDataForSearch() {
    let rem = await Search.deleteMany({});
    let posts = await Post.find({ isPublished: true }, "title");
    let events = await Event.find({ isPublished: true }, "eventName");
    let results = [];
    posts.forEach((post) =>
        results.push({ post: post._id, title: post.title })
    );
    events.forEach((event) =>
        results.push({ event: event._id, title: event.eventName })
    );
    Search.create(results)
        .then((docs) => {
            console.log(docs.length);
        })
        .catch((error) => console.log(error));
}

const createPostSearchEntry = (postID, title) => {
    let searchEntry = new Search({ post: postID, title });
    searchEntry.save();
};
const createEventSearchEntry = (eventID, title) => {
    let searchEntry = new Search({ event: eventID, title });
    searchEntry.save();
};
// loadDataForSearch();

// module.exports = router;
module.exports = { router, createPostSearchEntry, createEventSearchEntry };
