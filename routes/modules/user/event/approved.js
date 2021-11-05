const router = require('express').Router();
const User = require('../../../../src/model/user/userSchema');
const Event = require('../../../../src/model/user/events/eventSchema').model;

router.route('/').get(async (req, res) => {
    let user = await User.findOne({_id: req.user.ID}, "savedEvents");

    let options = {
        page: req.query.page ? req.query.page : 1 || 1,
        populate : [
            {path: 'knowledgeGroup', select: 'name slug logo moderators'},
            {path: 'author', select: 'userName email userImage'}
        ],
        lean: true
    }
    Event.paginate({status: 1, isHidden: false}, options).then(data => {
        data.docs.forEach(event => {
            if(event.knowledgeGroup[0] == null) {
                event.knowledgeGroup.splice(0, 1);
            }
            let mods = event.moderators.map(itm => {return itm.toString()});
            event.isModerator = mods.indexOf(req.user.ID) == -1 ? false : true;
            event.isSaved = user.savedEvents.indexOf(event._id) == -1 ? false : true;
            event.knowledgeGroup = transFormCommunities(event.knowledgeGroup, req.user.ID);
        })
        res.json({status: true, data: data, message: 'Get all events approved'});
    }).catch(error => {res.json(error)});
})


module.exports = router;