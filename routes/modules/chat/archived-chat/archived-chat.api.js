const router = require('express').Router();

const auth = require('../../../../middleware/auth');
const ArchiveChat = require('./archived-chat.model');


router.route('/').post(auth, archiveChat);
router.route('/').put(auth, removeFromArchive)

/**
 * 
 * @param {conversationID} req 
 * @param {} res 
 */
function archiveChat(req, res) {
    let ar_chat = new ArchiveChat({
        user: req.user.ID || '',
        conversationID : req.body.conversationID
    })

    ar_chat.save().then(chat => {
        res.json(chat);
    })
    .catch(error => res.status(500).json({message: error.message}));
}


/**
 * 
 * @param {conversationID} req 
 * @param {*} res 
 */
function removeFromArchive(req, res) {
    console.log(req.query);
    ArchiveChat.deleteOne({conversationID: req.query.conversationID, user: req.user.ID}).then(doc => {
        res.json({message: 'Conversation un-archived Successfully'});
    })
    .catch(error => res.status(500).json({message: error.message}))
}

module.exports = router;