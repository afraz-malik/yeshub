const Category = require('../src/model/category/category');
var fs = require('fs');
module.exports = function (req, res, next) {
    try {
        //checking username already exist or not
        if (!req.body.name) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.NAME_NOT_EMPTY
            }).end();
        }
        Category.findOne({ categoryName: req.body.name }, (err, category) => {
            if (err) {
                return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json({
                    error: CONSTANTS.INTERNAL_ERROR,
                    message: err.message
                }).end();
            }
            if (category) {
                //deleting upload image
                if (req.file) {
                    //delete recently uploaded file
                    if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg') {
                        // delete file named
                        fs.unlink(req.file.path, function (err) {
                            if (err) throw err;
                            // if no error, file has been deleted successfully
                            //console.log('File deleted!');
                        });
                    }
                }
                return res.status(CONSTANTS.SERVER_ALREADY_REPORTED_HTTP_CODE).json({
                    error: CONSTANTS.ALREADY_REPORTED,
                    message: CONSTANTS.ALREADY_EXIST,
                }).end();
            }
            next()
        })
    }
    catch (ex) {

        return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json({
            error: CONSTANTS.INTERNAL_ERROR,
            message: ex.message
        }).end();

    }
}