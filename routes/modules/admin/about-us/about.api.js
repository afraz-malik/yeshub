const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const About = require('./about.model');
const mongoose = require('mongoose');

var fs = require('fs');
const multer = require('multer');
const checkAdmin = require('../../../../middleware/checkAdmin');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirs = process.cwd() + '/uploads/aboutus';
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs);
        }
        cb(null, './uploads/aboutus');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);

    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});




router.route('/').post([auth, checkAdmin, upload.single("image")], create);
router.route('/').get(getAll);
router.route('/:id').get(getById).delete([auth, checkAdmin], remove);
router.route('/update/image/:id').put([auth, checkAdmin, upload.single("image")], updateImage);
router.route('/add/point/:id').put([auth, checkAdmin], addPoint);
router.route('/remove/point/:id').put([auth, checkAdmin], removePointFromAbout);
router.route('/update/point/:id').put(auth, udpatePoint);

function addPoint(req, res) {
    req.body._id = new mongoose.Types.ObjectId();
    console.log(req.body);
    About.findOneAndUpdate({_id: req.params.id}, {"$push": {"points": req.body}}, {upsert: false, new: true})
    .then(data => res.status(200).json({status: true, body: req.body, message: 'New Point Added to about us'}))
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function removePointFromAbout(req, res) {
    console.log('remove point');
    About.findOneAndUpdate({_id: req.params.id}, {$pull: { "points" : {_id: req.query.ID} } }, {upsert: false, new: true})
    .then(data => res.status(200).json({status: true, message: 'Point removed from about us'}))
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function create(req, res) {
    let about = new About({
        points: req.body.points.map(e => {return JSON.parse(e)})
    });
    if(req.file) {
        about.image = req.file.path.replace("uploads/", "");
    }

    about.save().then(data => {
        res.status(201).json({status: true, data: data, message: 'About us content created successfully'});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getAll(req, res) {
    About.find({}).then(data  => {
        res.json({status: true, data: data, message: 'About us content fetched'});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function updateImage(req, res) {
    let image = "";
    if(req.file) {
        image = req.file.path.replace('uploads/', "");
    } else {
        throw new Error('pleas add image');
    }
    About.findOneAndUpdate({_id: req.params.id}, {image: image}, {upsert: false, new: true}).then(data => {
        res.json({status: true, data: image, image: 'About us image updated successfully'});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}));
}

function getById(req, res) {
    About.findOne({_id: req.params.id}).then(data => {
        res.status(200).json({status: true, data: data, message: 'Fetched About us content'});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}


function remove(req, res) {
    About.findOneAndDelete({_id: req.params.id}).then(data => {
        res.status(200).json({status: true, message: 'Deleted About us content successfully'});
    })
    .catch(error => res.status(500).json({status: false, message: error.message}))
}


function udpatePoint(req, res) {
    About.findOneAndUpdate({_id: req.params.id, 'points._id': req.body.pointID}, {$set: { 'points.$.content': req.body.content}}, {udsert: false, new: true}).then(data =>{
        res.status(200).json({status: true, data: data});
    })
    .catch(error => res.status(500).json({status: true, message: error.message}));
}

module.exports = router;