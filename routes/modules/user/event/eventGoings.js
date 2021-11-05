const router = require("express").Router();
const EventGoings = require("../../../../src/model/user/eventGoings");
const auth = require("../../../../middleware/auth");
router.route("/mark").post(auth, toggleGoing);

async function toggleGoing(req, res) {
    let { event, action } = req.body;
    console.log("-------- req body event going ---------");
    console.log(event, action, req.user.ID);
    console.log("-------- req body event going ---------");
    try {
        let findEventGoing = await EventGoings.findOne({
            user: req.user.ID,
            event: event,
        });

        if (findEventGoing) {
            EventGoings.findOneAndUpdate(
                { _id: findEventGoing._id },
                { action: action },
                { upsert: false, new: true }
            )
                .then((doc) => {
                    return res.json({
                        message: "Added To Goings",
                        action: doc.action,
                    });
                })
                .catch((err) => {
                    return res.status(500).json({ message: err.message });
                });
        } else {
            let evg = new EventGoings({
                user: req.user.ID,
                event: event,
                action: action,
            });
            evg.save().then((doc) => {
                return res.json({
                    message: "Marked as Going",
                    action: doc.action,
                });
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Some Thing went wrong, please try again",
            error: err.message,
        });
    }
}

module.exports = router;
