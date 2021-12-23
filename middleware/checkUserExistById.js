const mongoose = require("mongoose");
const User = require("../src/model/user/userSchema");

module.exports = function (req, res, next) {
    try {
        if (!req.user.ID) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.USERID_NOT_FOUND,
                    message: CONSTANTS.USERID_NOT_FOUND,
                })
                .end();
        }
        //checking username already exist or not
        const status = getUser(req.user.ID);
        status.then(
            function (data) {
                if (data > 0) {
                    next();
                } else {
                    return res
                        .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.USER_NOT_FOUND,
                        })
                        .end();
                }
            },
            function (err) {
                console.log(err.message);
            }
        );
    } catch (ex) {
        return res
            .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
            .json({
                error: CONSTANTS.INTERNAL_ERROR,
                message: ex.message,
            })
            .end();
    }

    async function getUser(id) {
        const count = await User.findById(id).countDocuments();
        return count;
    }
};
