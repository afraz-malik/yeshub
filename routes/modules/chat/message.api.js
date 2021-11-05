const router = require('express').Router();

const ArchivedChat = require('./archived-chat/archived-chat.model');
const Message = require('./message.model');
const KnowledgeGroup = require('../../../src/model/knowledgeGroup/knowledgeGroup');
const User = require('../../../src/model/user/userSchema');
const Event = require('../../../src/model/user/events/eventSchema').model;

const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/checkAdmin');

router.use(auth);
const pop = [
    { path: 'to', select: 'userName userImage' },
    { path: 'from', select: 'userName userImage' },
    { path: 'community', select: 'log slug name' },
    { path: 'event', select: 'eventName slug' }
];
const sort = {
    createdAt: 1
};

const { SendChatEvent } = require('../events/chat/chat-event');
const knowledgeGroup = require('../../../src/model/knowledgeGroup/knowledgeGroup');
const { functions } = require('lodash');

router.route('/personal/to/user').post(sendToUser);

router.route('/personal/to/admin').post(sendToAdmin);

router.route('/user/to/mod').post(userToMod);

router.route('/user/to/eventmod').post(userToEventMod);

router.route('/mod/to/user').post(isMod, modToUser);

router.route('/event/mod/to/user').post(eventModToUser);

router.route('/com/to/com').post(isMod, comToCom);

router.route('/action/seen').put(seenMessage);

router.route('/action/deliver').put(makeDeliver);


router.route('/admin/by/conversation').post(adminToConversationID);
router.route('/admin/to/com').post(adminToCom);
router.route('/admin/to/event').post(adminToEvent);


// ---------------------
//       Get Messages
// ---------------------

router.route('/byconversation/:ID').get(getAllMessagesByConversationID);

router.route('/byadmin/byID').get(getMessagesByConversationID);

router.route('/get/from/user/:ID').get(msgsFromUser);

router.route('/get/from/admin').get(msgsFromAdmin);

router.route('/get/from/community/:ID').get(getMessagesInCommunity);

router.route('/get/from/event/:ID').get(getMessagesInEvent);

router.route('/get/from/user/in/community').get(getFromUserInCommunity);

router.route('/get/from/user/in/event').get(getFromUserInEvent);

router.route('/get/from/mods/in/community').get(isMod, getFromMod);

router.route('/get/threads').get(getThreadsForUser);

router.route('/get/threads/for/community/:ID').get(getThreadsForMod);

router.route('/get/threads/for/event/:ID').get(getThreadsForEvent);

router.route('/get/threads/for/admin').get(getThreadsForAdmin);

function sendToUser(req, res) {
    /**
     * send message from admin to user.
     * CHECK: check user is it admin
     */
    if (!req.body.to) {
        return res.status(400).json({ message: 'Please provide reciever user id' });
    }

    let msg = new Message(req.body);
    msg.from = req.user.ID;
    msg.conversationID = "admin-" + req.body.to;

    msg.save().then(async (doc) => {
        let message = await Message.populate(doc, pop);
        let data = {
            event: `message-${req.body.to}`,
            data: message
        };

        SendChatEvent('send-message', data);
        res.json({ status: true, message: 'Message sent successfully', data: doc });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function sendToAdmin(req, res) {
    let msg = new Message(req.body);
    msg.from = req.user.ID;
    msg.conversationID = "admin-" + req.user.ID;
    msg.save().then(async (doc) => {

        //send to admin event (msg-admin)
        let message = await Message.populate(doc, pop);
        let data = {
            event: `admin-message`,
            data: message
        };

        SendChatEvent('send-message', data);
        res.json({ status: true, message: 'Message sent successfully', data: doc });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function userToEventMod(req, res) {
    let msg = new Message(req.body);
    msg.from = req.user.ID;

    if (!req.query.event) {
        return res.status(400).json({ message: 'Please provide event, in which you wants to send message' });
    }

    msg.event = req.query.event;
    msg.conversationID = `ev-${req.query.event}-${req.user.ID}`;

    msg.save().then(async (doc) => {

        //send to admin event (msg-admin)
        let message = await Message.populate(doc, pop);
        let data = {
            event: `msg-eventmod-${req.query.event}`,
            data: message
        };

        SendChatEvent('send-message', data);
        res.json({ status: true, message: 'Message sent successfully', data: doc });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function userToMod(req, res) {
    let msg = new Message(req.body);
    msg.from = req.user.ID;

    if (!req.query.community) {
        return res.status(400).json({ message: 'Please provide community, in which you wants to send message' });
    }

    msg.community = req.query.community;
    msg.conversationID = `${req.query.community}-${req.user.ID}`;

    msg.save().then(async (doc) => {

        //send to admin event (msg-admin)
        let message = await Message.populate(doc, pop);
        let data = {
            event: `msg-mod-${req.query.community}`,
            data: message
        };

        SendChatEvent('send-message', data);
        res.json({ status: true, message: 'Message sent successfully', data: doc });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function modToUser(req, res) {
    let msg = new Message(req.body);
    msg.from = req.user.ID;

    if (!req.query.community) {
        return res.status(400).json({ message: 'Please provide community, in which you wants to send message' });
    }

    if (!req.body.to) {
        return res.status(400).json({ message: 'Please provide reciever user ID' });
    }

    msg.community = req.query.community;
    msg.conversationID = `${req.query.community}-${req.body.to}`;

    msg.save().then(async (doc) => {

        //send to admin event (msg-admin)
        let message = await Message.populate(doc, pop);
        let data = {
            event: `msg-com-${req.body.to}`,
            data: message
        };

        SendChatEvent('send-message', data);
        res.json({ status: true, message: 'Message sent successfully', data: doc });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function eventModToUser(req, res) {
    let msg = new Message(req.body);
    msg.from = req.user.ID;

    if (!req.query.event) {
        return res.status(400).json({ message: 'Please provide Event, in which you wants to send message' });
    }

    if (!req.body.to) {
        return res.status(400).json({ message: 'Please provide reciever user ID' });
    }

    msg.event = req.query.event;
    msg.conversationID = `ev-${req.query.event}-${req.body.to}`;

    msg.save().then(async (doc) => {

        //send to admin event (msg-admin)
        let message = await Message.populate(doc, pop);
        let data = {
            event: `msg-ev-${req.body.to}`,
            data: message
        };

        SendChatEvent('send-message', data);
        res.json({ status: true, message: 'Message sent successfully', data: doc });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function comToCom(req, res) {
    let msg = new Message(req.body);
    msg.from = req.user.ID;
    msg.community = req.query.community;

    if (!req.query.community) {
        return res.status(400).json({ message: 'Please provide community, in which you wants to send message' });
    }

    msg.conversationID = `in-${req.query.community}`;

    msg.save().then(async (doc) => {

        //send to admin event (msg-admin)
        let message = await Message.populate(doc, pop);
        let data = {
            event: `mods-in-com-${req.query.community}`,
            data: message
        };

        SendChatEvent('send-message', data);
        res.json({ status: true, message: 'Message sent successfully', data: doc });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}


// ?????
function adminToCom(req, res) {
    // admin to mod in community
    let ID = `in-${req.query.community}`;
    let msg = new Message({
        from: req.user.ID,
        message: req.body.message,
        community: req.query.community,
        conversationID: ID,
        image: req.body.image
    })

    msg.save().then(async (doc) => {
        let message = await Message.populate(doc, pop);
        let data = {
            data: message,
            event: `mods-in-com-${req.query.community}`
        }
        console.log('event data', data);
        SendChatEvent('send-message', data);
        res.json({ data: message, message: 'sent successfully' });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

//?????
function adminToEvent(params) {
    let ID = `iev-${req.query.event}`;
    let msg = new Message({
        from: req.user.ID,
        message: req.body.message,
        event: req.query.event,
        conversationID: ID,
        image: req.body.image
    })

    msg.save().then(async (doc) => {
        let message = await Message.populate(doc, pop);
        let data = {
            data: message,
            event: `iev-${req.query.event}`
        }

        SendChatEvent('send-message', data);
        res.json({ data: message, message: 'sent successfully' });
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

//????? in progress
async function adminToConversationID(req, res) {
    //
    let msg = new Message({
        from: req.user.ID,
        message: req.body.message,
        conversationID: req.query.ID,
        image: req.body.image
    })
    let events = [];
    try {
        let data = {};
        let ID = req.query.ID.split('-');
        if (ID[0] == 'admin') {
            // to specific user
            events.push(`message-${ID[1]}`)

        } else if (ID[0] == 'ev') {
            // to specific user in event
            events.push(`msg-ev-${ID[2]}`);
            events.push(`msg-eventmod-${ID[1]}`);
            msg.event = ID[1];

        } else if (ID[0] == 'in') {
            // to mod in community
            console.log("sending msg to the community: ", `mods-in-com-${ID[1]}`);
            events.push(`mods-in-com-${ID[1]}`);
            msg.community = ID[1];

        } else if (ID[0] == 'iev') {
            // to mod in event
            msg.event = ID[1];

        } else if (ID.length == 2) {
            // to specific user in comunity
            events.push(`msg-com-${ID[1]}`);
            events.push(`msg-mod-${ID[0]}`);
            msg.community = ID[0];
        }

        let saved_message = await msg.save();
        console.log(saved_message);
        let populated_msg = await Message.populate(saved_message, pop);

        data.data = populated_msg;
        let adminData = data;
        adminData.event = 'msg-to-admin'
        SendChatEvent('send-message', adminData);
        events.forEach(event => {
            data.event = event;
            SendChatEvent('send-message', data);
        })


        res.json({ data: saved_message, message: 'Message send successfully' });

    } catch (error) {

        res.status(500).json({ status: false, message: error.message });
    }

}


function seenMessage(req, res) {
    let ID = req.query.ID;
    Message.update({ conversationID: ID }, {seen:true}, {multi: true, upsert: false, new: true })
        .then(docs => {
            res.json({ message: 'Messages has been seen', status: true })

        })
        .catch(error => res.status(500).json({ message: error.message }))
}



function makeDeliver(req, res) { }

function getMessagesByConversationID(req, res) {
    Message.find({ conversationID: req.query.ID })
        .populate(pop)
        .sort(sort)
        .then(docs => {
            res.json({ data: docs, status: false })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function msgsFromUser(req, res) {

    let ID = "admin-" + req.params.ID;

    if (req.params.ID == undefined || req.params.ID == null) {
        res.status(400).json({ message: 'Please add user ID' });
    }

    Message.find({ conversationID: ID })
        .populate(pop)
        .sort(sort)
        .then(docs => res.json({ data: docs, status: true }))
        .catch(error => res.status(500).json({ message: error.message, status: false }));
}

function msgsFromAdmin(req, res) {
    let ID = "admin-" + req.user.ID;
    Message.find({ conversationID: ID })
        .populate(pop)
        .sort(sort)
        .then(docs => res.json({ data: docs, status: true }))
        .catch(error => res.status(500).json({ message: error.message, status: false }));
}

function getMessagesInCommunity(req, res) {

    let ID = req.params.ID + "-" + req.user.ID;
    Message.find({ conversationID: ID })
        .populate(pop)
        .sort(sort)
        .then(docs => {
            res.json({ data: docs });
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))

}


function getMessagesInEvent(req, res) {

    let ID = 'ev-' + req.params.ID + "-" + req.user.ID;

    Message.find({ conversationID: ID })
        .populate(pop)
        .sort(sort)
        .then(docs => {
            res.json({ data: docs });
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))

}

function getFromUserInCommunity(req, res) {

    let ID = req.query.community + "-" + req.query.user;
    Message.find({ conversationID: ID })
        .populate(pop)
        .sort(sort)
        .then(docs => {
            res.json({ data: docs });
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))

}

function getFromUserInEvent(req, res) {
    let ID = `ev-${req.query.event}-${req.query.user}`;
    console.log('ID', ID);
    Message.find({ conversationID: ID })
        .populate(pop)
        .then(docs => {
            res.json({ data: docs });
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function getFromMod(req, res) {
    let ID = 'in-' + req.query.community;
    Message.find({ conversationID: ID }).populate(pop).sort(sort).then(docs => {
        res.json({ status: true, data: docs })
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

// get for user
async function getThreadsForUser(req, res) {
    let conversationsID = await Message.find({}).distinct("conversationID");
    let communities = [];
    let events = [];
    let admin = {
        isAdmin: true,
        name: 'Admin',
        logo: 'https://img.icons8.com/clouds/2x/admin-settings-male.png',
        isAdmin: true,
        isUser: false,
        isMod: false,
        isEvent: false, 
        conversationID: `admin-${req.user.ID}`
    };
    conversationsID.forEach(id => {
        let ID = id.split("-");
        console.log(ID);
        if (ID[0] == 'ev' && ID[2] == req.user.ID) {
            events.push(ID[1])
        } else if (ID[0] != 'admin' && ID[0] != 'in' && req.user.ID == ID[1]) {
            communities.push(ID[0]);
            console.log('not', ID[0], id);
        } else if (ID[0] == 'admin') {
            // admin = {
            //     isAdmin: true,
            //     name: 'Admin',
            //     logo: 'https://img.icons8.com/clouds/2x/admin-settings-male.png',
            //     isAdmin: true,
            //     isUser: false,
            //     isMod: false,
            //     isEvent: false, 
            //     conversationID: `admin-${req.user.ID}`
            // }
        }
    })

    let event_logo = 'https://www.pngarts.com/files/1/Event-PNG-High-Quality-Image.png';

    let threads = await KnowledgeGroup.find({ _id: { $in: communities } }, "logo name").lean(true);
    let threads2 = await Event.find({ _id: { $in: events } }, "eventName").lean(true);
    console.log("total threads", threads.length);
    let result = threads.map(th => { th.isAdmin = false; th.conversationID = `${th._id}-${req.user.ID}`; th.isEvent = false; th.isMod = true; th.isUser = false; return th; })
    let result2 = threads2.map(th => { th.isAdmin = false; th.conversationID = `ev-${th._id}-${req.user.ID}`; th.logo = event_logo; th.name = th.eventName; delete th.eventName; th.isEvent = true; th.isMod = false; th.isUser = false; return th; })
    let finalResult = await transformAndSort([admin, ...result2, ...result]);
    let r = await Promise.all(
        _.map(finalResult, async (itm) => {
            let counts = await countMessages(itm.conversationID, req.user.ID);
            Object.assign(itm, {counts: counts});
            return itm;
        })
    )
    let resp = await filterArchived(r, req.user.ID);

    res.json(resp);
}

async function getAllMessagesByConversationID(req, res) {
    Message.find({conversationID: req.params.ID}).populate(pop).sort(sort).then(docs => {
        res.json(docs)
    })
    .catch(error =>res.status(500).json({message: error.message}));
}

async function getThreadsForAdmin(req, res) {

    try {
        let conversationIDs = await Message.find({}).sort({ createdAt: -1 }).distinct("conversationID");
        let threads = [];
        let communities = await knowledgeGroup.find({}, "name logo");

        let result = await Promise.all(_.map(conversationIDs, async function (id) {
            let ID = id.split('-');
            let user = null;
            let community = null;
            let event = null;
            let code = 0;
            
            // 0: user with admin
            // 1: event mod with user
            // 2: community mod with user in community
            // 3: mod with mod in community
            // 4: mode with user in event

            if (ID[0] == 'admin') {
                user = await User.findOne({ _id: ID[1] }, "userName userImage");
                code = 0;
            } else if (ID[0] == 'ev') {
                event = await Event.findOne({ _id: ID[1] }, "eventName slug");
                user = await User.findOne({ _id: ID[2] }, "userName userImage");
                code = 1;
            } else if (ID[0] == 'in') {
                community = await KnowledgeGroup.findOne({ _id: ID[1] }, "logo name") || ID[1];
                code = 3;
                delete id;
            } else if (ID.length == 2 && ID[0] != 'in' && ID[0] != 'admin' && ID[0] != 'iev') {
                community = await KnowledgeGroup.findOne({ _id: ID[0] }, "logo name");
                user = await User.findOne({ _id: ID[1] }, "userName userImage");
                code = 2;
            } else if (ID.length == 2 && ID[0] == 'iev') {
                event = await Event.findOne({ _id: ID[1] }, "eventName slug");
                code = 4;
            }

            threads.push({ user: user, event: event, community: community, conversationID: id, code: code });
            return id;
        }))

        communities.forEach(com => {
            if(conversationIDs.indexOf('in-'+com._id) == -1 ){
                threads.push({
                "user": null,
                "event": null,
                "community": com,
                "conversationID": "in-" + com._id,
                "code": 3
            })
            }
            
        })
        let finalResponse = await transformAndSort(threads);
        let r = await Promise.all(
            _.map(finalResponse, async (itm) => {
                let counts = await countMessages(itm.conversationID, req.user.ID);
                Object.assign(itm, {counts: counts});
                return itm;
            })
        )
        let resp = await filterArchived(r, req.user.ID);
        res.json(resp);

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
}

async function transformAndSort(threads) {
    let finalResponse = await Promise.all(
        _.map(threads, async function(thread) {

                let message = await Message.find({conversationID: thread.conversationID}, "message createdAt")
                                            .lean(true)
                                            .sort({createdAt: -1}).limit(1);
            console.log(message);
            Object.assign(thread, {lastMessage: message.length ? message[0].message : "", lastTime: message.length ? message[0].createdAt : new Date("12-12-1990")})
            return thread;
        })
    )


    finalResponse = finalResponse.sort((a, b) => (new Date(b.lastTime)) - (new Date(a.lastTime)));

    return finalResponse;
}
// get for user
async function getThreadsForMod(req, res) {
    let conversationsID = await Message.find({}).distinct("conversationID");
    let users = [];
    let community = null;
    conversationsID.forEach(async (id) => {

        let ID = id.split("-");

        if (ID[0] == 'in') {
            
        }

        if (ID[0] == req.params.ID) {
            users.push(ID[1]);
            console.log('not', ID[0], id);
        }
    })

    let threads = await User.find({ _id: { $in: users } }, "userName userImage").lean(true);
    community = await KnowledgeGroup.findOne({ _id: req.params.ID }, "name logo");

    let result = threads.map(th => {
        th.isAdmin = false;
        th.isMod = false;
        th.isUser = true;
        th.isEvent = false;
        th.name = th.userName; delete th.userName;
        th.logo = th.userImage; delete th.userImage;
        th.conversationID = `${community._id}-${th._id}`
        return th;
    })


    // if(community) {
    result.unshift({
        name: community.name,
        logo: community.logo,
        conversationID: 'in-' + community._id,
        isUser: false,
        isAdmin: false,
        isEvent: false,
        isMod: true
    });
    // }
    let finalResult = await transformAndSort(result);
    let r = await Promise.all(
        _.map(finalResult, async (itm) => {
            let counts = await countMessages(itm.conversationID, req.user.ID);
            Object.assign(itm, {counts: counts});
            return itm;
        })
    )
    let resp = await filterArchived(r, req.user.ID);
    
    res.json(resp);
}

async function getThreadsForEvent(req, res) {
    let conversationsID = await Message.find({}).distinct("conversationID");
    let users = [];

    conversationsID.forEach(id => {

        let ID = id.split("-");
        console.log(ID);
        if (ID[0] == 'ev' && ID[1] == req.params.ID) {
            users.push(ID[2]);
            console.log('not', ID[0], id);
        }
    })
    let threads = await User.find({ _id: { $in: users } }, "userName userImage").lean(true);
    console.log("total threads", threads.length);
    let result = threads.map(th => {
        th.isAdmin = false;
        th.isMod = false;
        th.isUser = true;

        th.name = th.userName; delete th.userName;
        th.logo = th.userImage; delete th.userImage;
        return th;
    })

    res.json(result);
}

async function isEventMod(req, res, next) {
    try {
        let event = await Event.findOne({ _id: req.query.event }, "moderators");
        if (event.moderators.indexOf(req.user.ID) == -1) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message, status: false });
    }
}

async function isMod(req, res, next) {
    try {
        let community = await KnowledgeGroup.findOne({ _id: req.query.community }, "moderators");
        if (community.moderators.indexOf(req.user.ID) == -1) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message, status: false });
    }
}

function getArchivedConversations(userID) {
    return ArchivedChat.find({user: userID}).distinct("conversationID");
}

async function filterArchived(data, userID) {
    let archived = [];
    let results = [];

    let archivedConversationIDS = await getArchivedConversations(userID);
    console.log("debuging", userID,  archivedConversationIDS)
    data.forEach(thread => {
        if(archivedConversationIDS.indexOf(thread.conversationID) == -1) {
            thread.isArchived = false;
            results.push(thread);
        } else {
            thread.isArchived = true;
            archived.push(thread);
        }
    })

    return {archived: archived, data: results};
}


function countUnseen(conversationID) {
    return Message.countDocuments({conversationID: conversationID, seen: false});
}


function countMessages(conversationID, userID) {
    return Message.countDocuments({conversationID: conversationID, from: {$ne: userID},  seen: false});
}

module.exports = router;