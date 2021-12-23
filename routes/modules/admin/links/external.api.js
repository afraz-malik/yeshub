const router = require('express').Router();
const Link = require('./external.model');
const auth = require('../../../../middleware/auth');
const checkAdmin = require('../../../../middleware/checkAdmin');
router.route('/add').post([auth, checkAdmin], add)
router.route('/get').get(getall);
router.route('/:ID', [auth, checkAdmin]).get(getOne).put(updateOne).delete(deleteOne);


function add(req, res) {
    let link = new Link(req.body);
    link.save().then(link => {
        res.json({status: true, message: 'Link created successfully', data: link});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getall(req, res) {
    Link.find().then(links => {
        res.json({status: true, message: 'Links Found successfully', data: links});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getOne(req, res) {
    Link.findOne({_id: req.params.ID}).then(link => {
        res.json({status: true, message: 'Link Found successfully', data: link});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function updateOne(req, res) {
    Link.findOneAndUpdate({_id: req.params.ID}, req.body, {upsert: false, new: true})
    .then(link => {
        res.json({status: true, message: 'Link updated successfully', data: link});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function deleteOne(req, res) {
    Link.findOneAndDelete({_id: req.params.ID}).then(docs => {
        res.json({status: true, message: 'Link Deleted successfully', data: docs});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}


module.exports = router;