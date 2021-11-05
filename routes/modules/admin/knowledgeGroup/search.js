const knowledgeGroup = require('../../../../src/model/knowledgeGroup/knowledgeGroup');
const Event = require('../../../../src/model/user/events/eventSchema').model;

const router = require('express').Router();

router.route('/community').get(search);
router.route('/event').get(searchEvent);

function search(req, res) {
    var regex = new RegExp(req.query.search, 'i');
    knowledgeGroup.find({name: regex}, "name logo").then(docs => res.json(docs))
    .catch(error => res.status(500).json({message: error.message}))
}

function searchEvent(req, res) {
    var regex = new RegExp(req.query.search, 'i');
    Event.find({eventName: regex}, "eventName slug").then(docs => res.json(docs))
    .catch(error => res.status(500).json({message: error.message}))
}

module.exports = router;