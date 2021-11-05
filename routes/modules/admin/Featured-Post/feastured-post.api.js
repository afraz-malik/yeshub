var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const multer = require('multer');
var sharp = require('sharp');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirs = process.cwd() + '/uploads/featured';
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs);
        }
        cb(null, './uploads/featured');
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

var auth = require('../../../../middleware/auth');
var checkAdmin = require('../../../../middleware/checkAdmin');
var FeaturedPost = require('./featured-post.model');
const { func } = require('joi');

router.route('/').post([auth, checkAdmin],upload.single('image'), create);
router.route('/').get(getAll);
router.route('/:id')
    .put([auth, checkAdmin], upload.single('image'), update)
    .delete([auth, checkAdmin], remove);



async function create(req, res) {
    try {
        let image;
        let thumbnail;
        let imagepath;
        if (req.file) {  
            image = req.file.path.replace("uploads/", "")
            thumbnail = "featured/thumbnail-"+req.file.filename;
            imagepath = "uploads/"+thumbnail;
        } else {
            throw new Error('Image is required, please provide image');
        }

        let resize = await sharp(req.file.path).resize({height: 150})
        .toFile(imagepath); 
        console.log(thumbnail);
        let fp = new FeaturedPost({
            displayImage: {
                thumbnail: thumbnail,
                original: image
            },
            title: req.body.title,
            description: req.body.description,
            redirectUrl: req.body.redirectUrl,
            author: req.user.ID
        })

        fp.save(function(err, doc) {
            if(err) {
                throw err;
            } else {
                res.status(201).json({
                    status: true,
                    data: doc,
                    message: 'Created Successfully'
                })
            }

        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
        
}

function getAll(req, res) {
    FeaturedPost.find({})
    .populate({path: 'author', select: 'userName userImage'})
    .sort({createdAt: -1})
    .then(docs => {
        res.json({status: true, data: docs, message: docs.length + " Featured posts found"});
    })
    .catch(error => {
        res.status(500).json({status: false, message: error.message});
    })
}

async function update(req, res) {
    if (req.file) {
        let thumbnail;
        let imagepath;
        let image = req.file.path.replace("uploads/", "");
        
        thumbnail = "featured/thumbnail-"+req.file.filename;
        imagepath = "uploads/"+thumbnail;
        
        let resize = await sharp(req.file.path)
                            .resize({height: 200})
                            .toFile(imagepath);
        
        req.body.displayImage = {original: image, thumbnail: thumbnail};
    }

    FeaturedPost.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: false, new: true})
    .then(data => res.status(200).json({
        status: true, 
        message: 'Featured post updated successfully'
    }))
    .catch(error => res.status(500).json({
        status: true, message: error.message
    }))
}

function remove(req, res) {
    FeaturedPost.findOneAndDelete({_id: req.params.id}).then(doc => {
        console.log(doc)
        res.json({
            status: true, message: 'Deleted successfully'
        })
    })
    .catch(error => res.status(500).json({status: false, message:error.message}))
}

module.exports = router;