const router = require('express').Router();
const User = require('../../../../src/model/user/userSchema');
const KnowledgeGroup = require('../../../../src/model/knowledgeGroup/knowledgeGroup');

router.route('/get').get(getModCommunities);

async function getModCommunities(req, res) {
    try {
        let user = await User.findOne({_id: req.user.ID}, "joinedCommunities");
        let communites = await KnowledgeGroup.find({_id: {$in: user.joinedCommunities} }, "moderators name slug logo").lean(true);
        let modcommunities = communites.filter(com => com.moderators.map(id => id.toString()).indexOf(req.user.ID) != -1);
        modcommunities.forEach(com=> delete com.moderators);
        res.json({status: true, data: modcommunities});
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}

module.exports = router;