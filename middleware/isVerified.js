const User = require("../src/model/user/userSchema");
ObjectId = require("mongodb").ObjectID;
module.exports = function (req, res, next) {
    console.log("user " , req.user);
    try {
        if (!req.user.ID) {
            console.log('--- i think not loged in -----');
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.FORBIDDEN,
                    message: CONSTANTS.TOKEN_IS_INVALID,
                })
                .end();
        }
        //checking user exist or not
        User.findOne(
            // { _id: req.user.ID, assignedRoles: CONSTANTS.ROLE_USER },
            { _id: req.user.ID},
            (err, user) => {
                if (err) {
                    return res
                        .status(
                            CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE
                        )
                        .json({
                            error: CONSTANTS.INTERNAL_ERROR,
                            message: err.message,
                        })
                        .end();
                }
                if (user === null) {
                    console.log('user is null, no user found with this id')
                    return res
                        .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                        .json({
                            error: CONSTANTS.UNAUTHORIZED,
                            message: CONSTANTS.FORBIDDEN,
                        })
                        .end();
                }
                if (user) {
                    if (user.progressBar.email === false) {
                        console.log('email not verified');
                        return res
                            .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                            .json({
                                error: CONSTANTS.UNAUTHORIZED,
                                message: CONSTANTS.EMAIL_IS_NOT_VERIFIED,
                            })
                            .end();
                    }
                    next();
                }
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
};
