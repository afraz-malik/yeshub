var express = require('express');
var router = express.Router();
var Post = require('../../../../src/model/user/post/postSchema');
var auth = require('../../../../middleware/auth');
var admin = require('../../../../middleware/checkAdmin');
const { func } = require('joi');
const User = require('../../../../src/model/user/userSchema');
const KnowledgeGroup = require('../../../../src/model/knowledgeGroup/knowledgeGroup');
router.route('/request/:id').put(auth, requestForCaseStudy);
router.route('/accept/:id').put([auth, admin], acceptRequest);
router.route('/reject/:id').put([auth, admin], rejectRequest);
router.route('/mark/it/:id').put([auth, admin], markAsCaseStudy);
router.route('/mark/as/featured/:id').put([auth, admin], markAsFeauredCaseStudy);
router.route('/unmark/as/featured/:id').put([auth, admin], unMarkAsFeauredCaseStudy);
router.route('/featured').get(getFeaturedCaseStudies);

router.route('/').get(getCaseStudies);
router.route('/in/review').get([auth, admin], getPendingCaseStudies);

function requestForCaseStudy(req, res) {
    Post.findOneAndUpdate({_id: req.params.id, isCaseStudy: 0}, {isCaseStudy: 2}, {upsert: false, new: true})
    .then(post => {
        if(!post) {
            throw new Error('Either post does not exist, or request is in pending or rejected');
        }
        res.status(200).json({
            status: true,
            message: 'Request submitted successfully'
        })
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}

function acceptRequest(req, res) {
    Post.findOneAndUpdate({_id: req.params.id, isCaseStudy: 2}, {isCaseStudy: 1}, {upsert: false, new: true})
    .then(post => {
        if(!post) {
            throw new Error('Either post does not exist, or request is in pending or rejected');
        }
        res.status(200).json({
            status: true,
            message: 'Request for casestudy entertained successfully'
        })
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}

function rejectRequest(req, res) {
    Post.findOneAndUpdate({_id: req.params.id, isCaseStudy: 2}, {isCaseStudy: 3}, {upsert: false, new: true})
    .then(post => {
        if(!post) {
            throw new Error('Either post does not exist, or only pending request can be rejected');
        }
        res.status(200).json({
            status: true,
            message: 'Request for cacsestudy declined successfully'
        })
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}

function markAsCaseStudy(req, res) {
    Post.findOneAndUpdate({_id: req.params.id, isCaseStudy: 0}, {isCaseStudy: 1}, {upsert: false, new: true})
    .then(post => {
        if(!post) {
            throw new Error('Either post does not exist, or request is in pending or rejected');
        }
        res.status(200).json({
            status: true,
            message: 'Successfully marked as successfully'
        })
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}

function getCaseStudies(req, res) {
    var query = { isCaseStudy: 1 };
    var options = {
        //select:   'title date author',
        sort: { createdAt: -1 },
        populate: [
            {path: "category" },
            {path: "knowledgeGroup" },
            {path: 'author', select: 'userName userImage'}
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };
    // Post.find({isCaseStudy: 1})
    Post.paginate(query, options)
    .then(posts => {
        res.status(200).json({
            status: true,
            data: posts,
            message: posts.docs.length + " case studies found"
        })
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}

function unMarkAsFeauredCaseStudy(req, res) {
    Post.findOneAndUpdate({_id: req.params.id}, {isFeaturedCaseStudy: false}, {upsert: false, new: true})
    .then(data => {
        res.status(200).json({
            status: true, 
            message: 'Successfully Unmarked featured case study'
        })
    }).catch(error => {
        res.status(500).json({
            status: false, 
            message: error.message
        })
    })
}

async function markAsFeauredCaseStudy(req, res) {
    try {
        let counts = await Post.countDocuments({isFeaturedCaseStudy: true});
        if(counts >= 3) {
            throw new Error("Maximum featured case study limit reached.");
        }
        let newFeaturedCaseStudy = await Post.findOneAndUpdate({_id: req.params.id}, {isFeaturedCaseStudy: true}, {upsert: false, new: true});
        res.status(200).json({
            status: true, 
            message: 'Successfully created featured case study'
        })
    } catch (error) {
        res.status(500).json({
            status: false, 
            message: error.message
        })
    }
}

async function getFeaturedCaseStudies(req, res) {
    let communities = await KnowledgeGroup.find({isArchived: false}).distinct("_id");
    Post.find({isFeaturedCaseStudy: true, knowledgeGroup: {$in: communities}}).lean(true).populate([{
        path: 'knowledgeGroup',
        select: 'name slug logo description, '
    }, {
        path: 'author',
        select: 'userName userImage email'
    }
]).then(async (data) => {
        let result = await Promise.all(
            _.map(data, async function(obj) {
                obj.knowledgeGroup.memberCounts = await getCommunityUsers(obj.knowledgeGroup._id);             
                return obj;
            })
        )
        res.status(200).json({
            status: true,
            message: result.length + " Featured case studies found",
            data: result
        })
    })
    .catch(error => res.status(500).json({
        status: false,
        message: error.message
    }))
}

function getPendingCaseStudies(req, res) {
    var query = { isCaseStudy: 2 };
    var options = {
        //select:   'title date author',
        sort: { createdAt: -1 },
        populate: [
            {path: "knowledgeGroup" },
            {path: 'author', select: 'userName userImage'}
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };
    Post.paginate(query, options)
    .then(posts => {
        res.status(200).json({
            status: true,
            data: posts,
            message: posts.length + "pending case studies found"
        })
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}

function getCommunityUsers(comID) {
    return User.countDocuments({joinedCommunities: {$in: [comID]}});
}

module.exports = router;