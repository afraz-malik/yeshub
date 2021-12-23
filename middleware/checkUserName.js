const User = require('../src/model/user/userSchema');

module.exports = function (req, res, next) {
    try {
        if (!req.body.userName) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.FORBIDDEN,
                message: CONSTANTS.USERNAME_NOT_EMPTY
            }).end();
        }
        //checking username already exist or not
        User.findOne({ userName: req.body.userName.trim() }, (err, user) => {
            if (err) {
                return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json(
                    {
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.message
                    }).end();;
            }
            if (user) {
                return res.status(CONSTANTS.SERVER_ALREADY_REPORTED_HTTP_CODE).json({
                    error: CONSTANTS.ALREADY_REPORTED,
                    message: CONSTANTS.USERNAME_AVAILABLE_FAILED,
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