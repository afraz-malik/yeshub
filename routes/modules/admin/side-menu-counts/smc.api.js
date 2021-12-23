const Post = require("../../../../src/model/user/post/postSchema");
const Community = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const Reports = require("../../user/reports/reports.model");
const Event = require("../../../../src/model/user/events/eventSchema").model;
const Message = require("../../chat/message.model");
const auth = require("../../../../middleware/auth");
const admin = require("../../../../middleware/checkAdmin");

const router = require("express").Router();

router.route("/get").get([auth, admin], getSideMenuCounts);

async function getSideMenuCounts(req, res) {
    // pending case studies
    // pending community joins
    // reports

    try {
        let counts = await Community.aggregate([
            {
                $unwind: {
                    path: "$pendingJoining",
                },
            },
            {
                $group: {
                    _id: "$pendingJoining",
                    totals: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: null,
                    totals: { $sum: "$totals" },
                },
            },
        ]);

        let casestudies = await Post.countDocuments({ isCaseStudy: 2 });

        let reports = await Reports.countDocuments({ actionPerformed: false });

        let events = await Event.countDocuments({ status: 0 });

        let inboxCounts = await Message.countDocuments({
            seen: false,
            from: { $ne: req.user.ID },
        });

        console.log("community pending joining", counts);

        res.json({
            community: counts[0].totals,
            casestudies: casestudies,
            events: events,
            reports: reports,
            inboxCounts,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

// getSideMenuCounts();

module.exports = router;
