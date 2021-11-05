const { ImageUploader } = require('../../../middleware/multipleImagesUploads');
const resize = require('../../../middleware/chatFileResizer');
const router = require('express').Router();
const fs = require('fs');

router.route('/').post([ImageUploader(1, 'chat'), resize], uploadFiles);
router.route('/').delete(remove);
function remove(req, res) {
    let path = `uploads/${req.body.file}`;
    console.log(path);
    console.log('deleting above file ....');
    fs.unlink(path, () => {});
}

function uploadFiles(req, res) {
    if(req.body.images) {
        res.json({data: req.body.images[0]});
    } else {
        res.status(500).json("no file available");
    }
}

module.exports = router;
