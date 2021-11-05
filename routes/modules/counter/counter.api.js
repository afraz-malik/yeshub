const express = require('express');
var router = express.Router();
var Community = require('../../../src/model/knowledgeGroup/knowledgeGroup');
var Post = require('../../../src/model/user/post/postSchema');
const ResourceCounter = require('../resources/resource.model');
router.route('/').get(getCounters);
async function getCounters(req, res) {
    try {        
        let caseStudies = await Post.countDocuments({isCaseStudy: 1});
        let communities = await Community.countDocuments();
        let rc = await ResourceCounter.findOne({});
        res.status(200).json({status: true, caseStudies: caseStudies, communities: communities, resources: rc.counter || 0});
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }    
}

module.exports = router;