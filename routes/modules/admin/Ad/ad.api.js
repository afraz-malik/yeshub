var express = require('express');
var router = express.Router();
var Ad = require('./ad.model');
var verifyAdmin = require('../../../../middleware/checkAdmin');
var auth = require('../../../../middleware/auth');
var fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirs = process.cwd() + '/uploads/ads';
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs);
        }
        cb(null, './uploads/ads');
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


router.route('/').post([auth, verifyAdmin], upload.single('image'), createAd);
router.route('/:id').delete([auth, verifyAdmin], deleteAd);
router.route('/').get(getAds);
router.route('/:id').put([auth, verifyAdmin], upload.single('image'), updateAd);


function getAds(req, res) {

    Ad.find({}).then(ads => {
        res.status(200).json({ status: true, data: ads, message: ads.length + ' Ads found successfully' })
    })
        .catch(error => res.status(500).json({ status: false, message: error.message }));
}

async function createAd(req, res) {
    let image;
    if (req.file) {
        image = req.file.path.replace("uploads/", "")
    }
   
    var ad = new Ad(req.body);
    ad.image = image;
    ad.save().then(function (Ad) {
        res.status(201).json({ status: true, message: 'Created Ad Successfully' });
    })
    .catch(error => {
        res.status(500).json({
            status: false, 
            message: error.message
        })
    })
}

function deleteAd(req, res) {
    Ad.findOneAndDelete({ _id: req.params.id })
    .then(data => {
        console.log(data);
        res.status(200).json({ status: true, message: 'Ad deleted successfully' });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ status: false, message: error.message })
    });
}

function updateAd(req, res) {
    
    if (req.file) {
        let image = req.file.path.replace("uploads/", "");
        req.body.image = image;
    }
     
    Ad.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false, new: true }).then(data => {
        console.log(data);
        res.status(200).json({ status: true, message: data.title + ' Ad updated successfully' });
    })
    .catch(error => res.status(500).json({ status: false, message: error.message }));
}


module.exports = router;