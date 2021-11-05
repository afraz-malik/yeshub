const mongoose = require('mongoose');
const { validateID } = require('../routes/modules/generalModules/general');
const Post = require('../src/model/user/post/postSchema');
module.exports = function (req, res, next) {

    try {
        //checking Post ID is valid or not
        if (!req.body.ID) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.ID_IS_REQUIRED
            }).end();
        }
        if (validateID(req.body.ID)) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_POST_ID
            }).end();
        }
        Post.findOne({ _id: req.body.ID, author: req.user.ID }, (err, post) => {
            if (err) {
                return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json({
                    error: CONSTANTS.INTERNAL_ERROR,
                    message: err.message
                }).end();
            }
            if (post === null) {
                return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error: CONSTANTS.UNAUTHORIZED,
                    message: CONSTANTS.INVALID_POST_AUTHOR,
                }).end();
            }
            next();
        })
    }
    catch (ex) {

        return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json({
            error: CONSTANTS.INTERNAL_ERROR,
            message: ex.message
        }).end();

    }
}