const router = require('express').Router();
const Banner = require('./banner.model');
const auth = require('../../../../middleware/auth');
const checkAdmin = require('../../../../middleware/checkAdmin');

router.route('/add').post([auth, checkAdmin], add)
router.route('/get').get(getall);
router.route('/:ID', [auth, checkAdmin]).get(getOne).put(updateOne).delete(deleteOne);


function add(req, res) {
    // return res.status(403).json({message: 'No more banners allowed'})
    let banner = new Banner(req.body);
    banner.save().then(doc => {
        res.json({status: true, message: 'Banner created successfully', data: doc});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getall(req, res) {
    Banner.find().then(docs => {
        res.json({status: true, message: 'Banners Found successfully', data: docs});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getOne(req, res) {
    Banner.findOne({_id: req.params.ID}).then(doc => {
        res.json({status: true, message: doc == null ? "No banner found" : 'Banner Found successfully', data: doc});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function updateOne(req, res) {
    Banner.findOneAndUpdate({_id: req.params.ID}, req.body, {upsert: false, new: true})
    .then(doc => {
        res.json({status: true, message: 'Banner updated successfully', data: doc});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function deleteOne(req, res) {
    return res.status(403).json({message: "Not allowed to delete banner"});
    Banner.findOneAndDelete({_id: req.params.ID}).then(doc => {
        res.json({status: true, message: 'Banner Deleted successfully', data: doc});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}


module.exports = router;