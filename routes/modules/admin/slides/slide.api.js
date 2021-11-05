var express = require('express');
var router = express.Router();
var Slide = require('./slide.model');
var verifyAdmin = require('../../../../middleware/checkAdmin');
var auth = require('../../../../middleware/auth');
var fs = require('fs');
const multer = require('multer');
const { findById } = require('./slide.model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirs = process.cwd() + '/uploads/slides';
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs);
        }
        cb(null, './uploads/slides');
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
    //fileFilter: fileFilter
});


router.route('/').post([auth, verifyAdmin], upload.single('image'), createSlide);
router.route('/').get(getSlides);
router.route('/:ID').delete([auth, verifyAdmin], deleteSlide);//.get(findById);;
router.route('/:ID').get(getByID)

function getSlides(req, res) {

    Slide.find({}).then(slides => {
        res.status(200).json({ status: true, data: slides, message: slides.length + ' Slides found successfully' })
    })
    .catch(error => res.status(500).json({ status: false, message: error.message }));
}

async function createSlide(req, res) {
    let image;
    if (req.file) {
        image = req.file.path.replace("uploads/", "")
    }


    var slide = new Slide(req.body);
    slide.image = image;
    slide.save().then(function (slide) {
        res.status(201).json({ status: true, data: slide, message: 'Created Slide Successfully' });
    })
    .catch(error => {
        res.status(500).json({
            status: false, 
            message: error.message
        })
    })

}

function getByID(req, res) {
    Slide.findOne({ _id: req.params.ID })
    .then(data => {
        res.status(200).json({ status: true, data: data, message: 'Slides found successfully' });
    })
    .catch(error => {
        res.status(500).json({ status: false, message: error.message })
    });
}

function deleteSlide(req, res) {
    Slide.findOneAndDelete({ _id: req.params.ID })
    .then(data => {
        res.status(200).json({ status: true, message: 'Slide deleted successfully' });
    })
    .catch(error => {
        res.status(500).json({ status: false, message: error.message })
    });
}


module.exports = router;