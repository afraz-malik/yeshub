const mongoose = require('mongoose');
const User = require('../src/model/user/userSchema');

module.exports = function (req, res, next) {

    try {
        //checking username already exist or not
        if (!req.body.email) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.EMAIL_NOT_EMPTY
            }).end();
        }
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json({
                    error: CONSTANTS.INTERNAL_ERROR,
                    message: err.message
                }).end();
            }
            if (user) {
                return res.status(CONSTANTS.SERVER_ALREADY_REPORTED_HTTP_CODE).json({
                    error: CONSTANTS.ALREADY_REPORTED,
                    message: CONSTANTS.EMAIL_EXIST,
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