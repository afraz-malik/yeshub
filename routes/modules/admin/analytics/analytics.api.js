const router = require('express').Router();
const Post = require('../../../../src/model/user/post/postSchema');
const { CommentVote, PostVote, ReplyVote, EventVote } = require('../../user/post/votes/vote.model');
const Comment = require('../../user/post/comment_section/comment/comment.model');
const { reset } = require('module-alias');
const knowledgeGroup = require('../../../../src/model/knowledgeGroup/knowledgeGroup');
const User = require('../../../../src/model/user/userSchema');
const Report = require('../../user/reports/reports.model');
const { deactivateAccount } = require('../../generalModules/userGeneralOperations');
const { communityJoiondDuring, communityJoinedDuring } = require('./ga');
router.route('/get/top/users').get(getTopUsers);
router.route('/get/top/posts').get(topPosts);
router.route('/get/communities').get(getCommunites);

// Post.find({createdAt: {$gt: 0}}).then(docs => console.log(docs.length)).catch(error => console.log(error));
function getTopUsersInRange(req, res) {
    let from = new Date(req.query.from);
    let to = new Date(req.query.to || Date.now());
    
    Post.aggregate([
        {
            $match :{
                'createdAt' : {$gte: date}
            }
        },
        {
            $group: {
                _id: '$author',
                'total_posts': {$sum: 1}
            }
        }, {
            $project: {
                user: '$_id', 
                totalPosts: '$total_posts',
                '_id': -1
            }
        }, {
            $sort : {
                totalPosts: -1
            }
        }, {
            $limit: 10
        }
    ], function(err, docs) {
        Post.populate(docs, {path: 'user', model: 'User', select: 'userName'})
        .then(async (docs) => {
            let result = await Promise.all(
                _.map(docs, async function(user) {
                    user.votes = await countVotes(user.user, from, to);
                    user.comments = await countComments(user.user, from, to);
                    return user;
                })
            )
            res.json({data: docs, erro: err});
        }).catch(err => res.status(500).json({message: err.message}))    
    })


}

function getTopUsers(req, res) {

  
    let q;
    if(req.query.from == 'undefined' || req.query.from == null || req.query.from == undefined) {
        console.log(false);
        q = '1990-10-10';;
    } else {
        console.log(true);
        q = req.query.from;
    }
    let from = new Date(q);
    let to = new Date(req.query.to || Date.now());
    console.log(req.query.from, q, from, to);
    Post.aggregate([
        {
            $match :{
                'createdAt' : {$gte: from, $lte: to}
            }
        },
        {
            $group: {
                _id: '$author',
                'total_posts': {$sum: 1}
            }
        }, {
            $project: {
                user: '$_id', 
                totalPosts: '$total_posts',
                '_id': -1
            }
        }, {
            $sort : {
                totalPosts: -1
            }
        }, {
            $limit: 10
        }
    ], function(err, docs) {
        console.log('docs ::::: ', docs.length);
        Post.populate(docs, {path: 'user', model: 'User', select: 'userName'}).then(async (docs) => {
            let result = await Promise.all(
                _.map(docs, async function(user) {
                    user.votes = await countVotes(user.user, from, to);
                    user.comments = await countComments(user.user, from, to);
                    return user;
                })
            )
            res.json({data: docs, erro: err});
        }).catch(err => res.status(500).json({message: err.message}))    
    })

}

function topPosts(req, res) {
    let query = Number(req.query.range) || 0;
    let date = new Date();
    switch (query) {
        case 7:
            date.setDate(date.getDate() - 7); 
            console.log('its seven');
            break;
        case 30:
            date.setDate(date.getDate() - 30);
            console.log('its thirty');
            break;
        case 1:
            console.log("this is one");
            break;
        default:
            date = 0;
            
        break;
    }
    let q;
    if(req.query.from == 'undefined' || req.query.from == null || req.query.from == undefined) {
        console.log(false);
        q = '1990-10-10';;
    } else {
        console.log(true);
        q = req.query.from;
    }


    let from = new Date(q);
    let to = new Date(req.query.to || Date.now());
 
    console.log(req.query.from, q, from);
    Post.find({createdAt: {$gte: from, $lte: to} }, "slug title author totalComments totalVotes knowledgeGroup createdAt")
    .populate({path: 'author', select: 'userName userImage'})
    .populate({path: 'knowledgeGroup', select: 'name'})
    .limit(10)
    .sort({
        totalComments: -1,
        totalVotes: -1,
        createdAt: -1
    }).then(docs => {
        res.json({data: docs})
    })
    .catch(error => res.status(500).json({message: error.message}))
}

function getJoined(coms, name) {
    for(let i=0; i<coms.length; i++) {
        if(coms[i].eventLabel === name) {
            return coms[i].totalEvents;
        }
    }

    return 0;
}

async function getCommunites(req, res) {

  
    let q;
    if(req.query.from == 'undefined' || req.query.from == null || req.query.from == undefined) {
        console.log(false);
        q = '2010-10-10';;
    } else {
        console.log(true);
        q = req.query.from;
    }

    
    let from = new Date(q);
    let to = new Date(req.query.to || Date.now());
    let joinedComs = await communityJoinedDuring(from, to);// || [];
    console.log(joinedComs);
    try { 
        let communities = await knowledgeGroup.find({}, "name logo slug").lean(true);
        let results = await Promise.all(
            _.map(communities, async function(community) {
                let metadata = await communityMeta(community._id, from, to);
                community.members = await User.countDocuments({joinedCommunities: { $in: [community._id]}});
                community.posts = metadata.totalPosts;
                community.votes = metadata.totalVotes;
                community.comments = metadata.totalComments;
                community.reports = metadata.reports;
                community.votesInComments = metadata.votesInComments;
                community.joined = getJoined(joinedComs, community.name);
                // console.log('joined com', joined)

                return community;
            })
        )

        res.json(results);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

async function countVotes(userID, from, to = new Date()) {
    try {
        const pv = await PostVote.countDocuments({userId: userID, createdAt : {$gte: from, $lte: to} });
        const cv = await CommentVote.countDocuments({userId: userID, createdAt : {$gte: from}});
        const rv = await ReplyVote.countDocuments({userId: userID, createdAt : {$gte: from}});
        const ev = await EventVote.countDocuments({userId: userID, createdAt : {$gte: from}});
        return pv + cv + rv + ev;
    } catch (error) {
        throw error;
    }
    
}

function countComments(userID, from, to) {
    return Comment.countDocuments({userId: userID, createdAt: {$gte: from, $lte: to}});
}

async function communityMeta(ID, from, to) {
    let posts = await Post.find({knowledgeGroup: ID, createdAt: {$gte: from, $lte: to} }, "totalVotes totalComments").lean(true);
    let obj = {totalComments: 0, totalVotes: 0, totalPosts: posts.length, reports: 0, votesInComments:0};
    let uniqueposts = postsIDS(posts);
    obj.votesInComments = await countCommentsForPosts(uniqueposts);
    
    posts.forEach(async (post) => {
        obj.totalVotes += post.totalVotes;
        obj.totalComments += post.totalComments;
        obj.reports += await Report.countDocuments({post: post._id}); 
    })
    return obj;
}

function postsIDS (posts) {
    let ids = [];
    posts.forEach(itm => ids.push(itm._id));
    return ids;
}

async function countCommentsForPosts(posts) {
    let comments = await Comment.find({postId: {$in: posts}}).distinct("_id");
    return CommentVote.countDocuments({commentId: {$in: comments}});
}

module.exports = router;
