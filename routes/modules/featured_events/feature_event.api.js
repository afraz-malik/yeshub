const router = require('express').Router();
const Event = require('../../../src/model/user/events/eventSchema').model;

router.route('/event/:ID').get(MarkEventAsFeatured);
async function MarkEventAsFeatured(req, res) {
    let featuredEvents = await Event.countDocuments({isFeatured: 1});
    if(featuredEvents > 3) {
        throw new Error('Limit already reached to three, more feature events not allowed');
    }
    Event.findOne({_id: req.params.ID, isFeatured: 2}).then(event =>{
        res.status(200).json({status: true, data: event, message: ' Found featured event'});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}



router.route('/events').get(getFeaturedPosts);
async function getFeaturedPosts(req, res) {
    Event.find({isFeatured: 2}).then(events =>{
        res.status(200).json({status: true, data: events});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));

}

module.exports = router;
