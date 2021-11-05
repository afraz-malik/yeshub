const router = require('express').Router();
const { Request, SimpleGA } = require('node-simple-ga');
let pathToFile = __dirname +"/../../../../react-ga-api-8ed2f4f82988.json";
if(process.env.NODE_ENV === 'production')  {
    console.log('production creds included ...');
    pathToFile = __dirname +"/../../../../ga-credentials-prod.json";
}

var analytics = new SimpleGA(pathToFile);
const config = require('../../../../config/config.json');
const User = require('../../../../src/model/user/userSchema');
const Community = require('../../../../src/model/knowledgeGroup/knowledgeGroup');
let totalCommunities = [];
let totalUsers = 0;
let GA_VIEW_ID;
if(process.env.NODE_ENV==='production') {
    GA_VIEW_ID = config.production.viewID;
    console.log('this is production env ....');
} else {
    GA_VIEW_ID = config.development.viewID;
}

async function countCommunities() {
    Community.find({}, "name").lean(true)
        .then(async (docs) => {
            let results = await Promise.all(

                _.map(docs, async (itm) => {
                    itm.name = `/${itm.name}`;
                    itm.members = await User.countDocuments({ joinedCommunities: { $in: [itm._id] } });
                    return itm;
                })
            )
            totalCommunities = results;
        })
}

async function countUsers() {
    totalUsers = await User.countDocuments();
}

countUsers();
countCommunities();

router.route('/site/analytics').get(getSiteAnalytics);
router.route('/community/analytics').get(getCommunityAnalytics);
async function communityJoinedDuring(start, end, name) {
    
    var request2 = Request().select("eventAction", "eventCategory", "totalEvents", "eventLabel")
        .from(GA_VIEW_ID)
        // .where('eventlabel').equals(name)
        .where('eventAction').equals('Joined')
        .during(transformDate(start), transformDate(end))
    try {

        var [data1] = await Promise.all([
            analytics.run(request2)
        ]);

        return data1;

        console.log(data1);

    } catch (error) {
        console.log(error);
    }
}
let dat = new Date();
    dat.setDate(dat.getDate() - 102);
// test(dat, new Date());

async function getCommunityAnalytics(req, res) {

    let pagePath = req.query.page;
    let eventpage = pagePath.replace("/", "");
    let date = new Date();

    var request2 = Request().select("eventAction", "eventCategory", "totalEvents", "eventLabel")
        .from(GA_VIEW_ID).where('eventLAbel')
        .equals(eventpage)
        .during(transformDate(new Date(req.query.from)), transformDate(new Date(req.query.to)));

    var request1 = Request()
        .select('pagepath', 'sessionDuration', "pageViews", "users", "uniquePageViews")
        .from(GA_VIEW_ID)
        .where("pagepath").not().contains("/archive/")
        .where("pagepath").equals(pagePath)
        .during(transformDate(new Date(req.query.from)), transformDate(new Date(req.query.to)))
        .results(100)

    try {

        var [data1, data2] = await Promise.all([
            analytics.run(request1),
            analytics.run(request2)
        ]);

        console.log(data1, data2)
        let objects = data1.length ? data1[0] : { members: 0 };
        for (let i = 0; i < totalCommunities.length; i++) {
            if (totalCommunities[i].name == req.query.page) {
                objects.members = totalCommunities[i].members;
                break;
            }
        }

        res.json({ data: objects || {}, events: data2[0] || {} })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getSiteAnalytics(req, res) {

    
    var request1 = Request()
        .select('pagepath', 'sessionDuration', "pageViews", "users", "uniquePageViews")
        .from(GA_VIEW_ID)
        .where("pagepath").not().contains("/archive/")
        .where("pagepath").equals("/")
        .during(transformDate(new Date(req.query.from)), transformDate(new Date(req.query.to)))
        .results(100)

    try {

        var [data1] = await Promise.all([
            analytics.run(request1)
        ]);

        data1[0].totalMembers = totalUsers;

        res.json({ data: data1[0] })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function transformDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate()
    
    return `${year}-${month < 9 ? '0'+(month+1) : month + 1}-${day < 10 ? '0'+day : day}`;
}


async function ad(comunity) {
    let date = new Date();
    var request1 = Request()
        // .select("pagepath", "pageviews",  "users", "sessions", "bounceRate", "sessionDuration", "uniquePageViews")
        .select('eventCategory', 'eventAction', "totalEvents", "eventLabel")
        .from(GA_VIEW_ID)
        .where("pagepath").not().contains("/archive/")
        // .where('pagepath').equals("/")
        // .where("eventLabel").equals(comunity || "Testing Chat")
        // .during(transformDate(date), '2020-09-25')
        // .whereDimensions('newusers')
        // .whereMetrics("totalEvents")
        // .where("pageviews").lessThan(101)
        .results(100)
    // .orderDesc("users")


    try {

        var [data1] = await Promise.all([
            analytics.run(request1)
        ]);

        console.log(data1);

    } catch (error) {

        console.log(error);

    }
}
// ad();
router.route('/node/ga').get(ga);

function ga(req, res) { }

module.exports = router;
module.exports.communityJoinedDuring = communityJoinedDuring; 