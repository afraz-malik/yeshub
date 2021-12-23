const router = require('express').Router();
const auth = require('../../../../middleware/auth');
const checkAdmin = require('../../../../middleware/checkAdmin');

const Language = require('./language.model');

router.route('/').post([auth, checkAdmin], create).get(getAll);
router.route('/:ID').put([auth, checkAdmin], update).delete([auth, checkAdmin],remove).get(getOne);
router.route('/get/active').get(getActiveAll);
router.route('/get/active/stages').get(getActiveAllStages);

function create(req, res) {
    let lan = new Language(req.body);
    lan.save().then(language => {
        res.json({status: true, message: 'Language Added Successfully', data:language});
    })
    .catch(error => {
        res.status(500).json({status: false, message: error.message});
    })
}

function getAll(req, res) {
    Language.find({}).then(docs => {
        res.json({status: true, data: docs});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getActiveAll(req, res) {
    Language.find({display: true}).then(docs =>{
        res.json({status: true, data: docs, message: 'Found ' + docs.length + ' languages'});
    }).catch(error => res.status(500).json({status: false, message: error.message}))
}


function getActiveAllStages(req, res) {
    Language.find({stageDisplay: true}).then(docs => {
        res.json({status: true, data: docs, message: 'Found ' + docs.length + ' languages'});
    }).catch(error => res.status(500).json({status: false, message: error.message}))
}

function update(req, res) {
    Language.findOneAndUpdate({_id: req.params.ID}, {stageDisplay: req.body.stageDisplay, display: req.body.display, title: req.body.title}, {upsert: false, new:true})
    .then(doc => {
        res.json({status: true, message: 'Language updated successfully', data: doc});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function remove(req, res) {
    Language.findOneAndDelete({_id: req.params.ID})
    .then(doc => {
        res.json({status: true, message: 'Language deleted successfully'});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getOne(req, res) {
    Language.findOne({_id: req.params.ID})
    .then(doc => {
        res.json({status: true, message: 'Language found successfully', data: doc});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}


module.exports = router;