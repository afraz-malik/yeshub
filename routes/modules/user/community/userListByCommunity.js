const express = require("express");
const userSchema = require("../../../../src/model/user/userSchema");
const router = express.Router();
const User = require("../../../../src/model/user/userSchema");
const auth = require("../../../../middleware/auth");
const KnowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");

router.route("/by/community/:id").get(auth, getUserList);
async function getUserList(req, res) {
    let query = { joinedCommunities: { $in: [req.params.id] } };

    let community = await KnowledgeGroup.findOne(
        { _id: req.params.id },
        "moderators invitesModerator"
    ).lean(true);
    // console.log('community moderators', community.moderators, community.invitesModerator);
    let invited = community.invitesModerator.map((itm) => itm.toString());
    let mods = community.moderators.map((itm) => itm.toString());
    console.log(invited);
    let options = {
        select: "userName userImage",
        lean: true,
        page: req.query.page && req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 150,
    };

    User.paginate(query, options)
        // User.find(query, options)
        // .lean(true)
        .then((result) => {
            result.docs.forEach((user) => {
                user.isModerator =
                    mods.indexOf(user._id + "") == -1 ? false : true;
                user.isInvited =
                    invited.indexOf(user._id + "") == -1 ? false : true;
            });

            res.status(200).json({
                status: true,
                data: result,
                message: "list of users by community",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: true, message: error.message })
        );
}

module.exports = router;
