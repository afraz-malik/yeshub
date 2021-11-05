const router = require('express').Router();
const admin = require('../../../../middleware/checkAdmin');
const auth = require('../../../../middleware/auth');
const BannedEmail = require('./banned-email.model');


router.route('/email').post(add).get(getall);
router.route('/email/:ID').put(update).delete(remove);


function add(req, res) {
    let be = new BannedEmail(req.body);
    be.save()
    .then(em => res.json({message: "Email is blocked successfully"}))
    .catch(err => res.status(500).json({message: err.message}));
}

function getall(req, res) {
    BannedEmail.find({}).then(docs => {
        res.json({data: docs, message: 'Found banned emails'})
    })
    .catch(err =>{
        res.status(500).json({message: err.message, status: false});
    })
}

function update(req, res) {}

function remove(req, res) {}


module.exports = router;