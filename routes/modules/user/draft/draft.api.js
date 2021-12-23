const router = require('express').Router();
const Draft = require('./draft.model');
const auth = require('../../../../middleware/auth');
const { ImageUploader } = require('../../../../middleware/multipleImagesUploads');
const resizeContainer = require('../../../../middleware/multipleResizeImages');

router.route('/event').post( [auth, ImageUploader(5, 'draft'), resizeContainer], draftEvent);
router.route('/event').get( auth, getDrafts);


function draftEvent(req, res) {
    
    let d = new Draft({title: 'event'});
    // console.log(req.body.images);
    if(req.body.date) {
        console.log('parsing date');
        req.body.date = JSON.parse(req.body.date);
    }
    if(req.body.link) {
        console.log('parsing link');
        req.body.link = req.body.link.map(_link => {
            return JSON.parse(_link);
        });
    }
    if(req.body.subEvent) {
        console.log('parsing sub event');
        req.body.subEvent = req.body.subEvent.map(event => {
            return JSON.parse(event);
        })
    }
    console.log(req.body);
    d.event = req.body;
    d.user = req.user.ID;
    d.save().then(draft => {
        res.status(200).json({
            status: true, 
            data: draft, 
            message: 'event saved as draft successfully'});
    })
    .catch(Error => res.status(500).json({status: false, message: Error.message}));
}


function getDrafts(req, res) {
    Draft.find({user: req.user.ID}, "event").then(drafts => {
        res.status(200).json({status: true, data: drafts});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

module.exports = router;