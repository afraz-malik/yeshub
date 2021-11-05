const router = require('express').Router();
const ResourceCounter = require('./resource.model');

const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/checkAdmin');

router.route('/').post(create);
router.route('/').get(getOne);
router.route('/:ID')
    .put(update)
    .delete(deleteCounter);

function create(req, res) {

    let resource = new ResourceCounter({counter: req.body.counter});
    resource.save().then(data => res.status(200).json({status: true, data: data, message: 'Created Successfully'}))
    .catch(error => res.status(500).json({status: false, message: error.message}));

}


function getOne(req, res) {
    ResourceCounter.findOne({})
    .then(data => res.status(200).json({message: data == null ? 'no resource counter founds': 'found succesfully', status: true, data: data}))
    .catch(Error => res.status(500).json({status: false, error: error.message}));
}

function deleteCounter(req, res) {
    ResourceCounter.findOneAndDelete({_id: req.params.ID}).then(data => res.status(200).json({status: true, message: 'Deleted successfully'}))
    .catch(Error => res.status(500).json({status: false, error: error.message}));
}


function update(req, res) {
    ResourceCounter.findOneAndUpdate({_id: req.params.ID}, {counter: req.body.counter}, {upsert: false, new: true})
    .then(data => res.status(200).json({status: true, data: data,  message: 'Resource updated successfully'}))
    .catch(Error => res.status(500).json({status: false, error: error.message}));
}

module.exports = router;