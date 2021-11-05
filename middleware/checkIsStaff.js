const User = require("../src/model/user/userSchema");
ObjectId = require("mongodb").ObjectID;
module.exports = function (req, res, next) {
    try {
        if (!req.user.ID) {
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
            { _id: req.user.ID, assignedRoles: CONSTANTS.ROLE_STAFF },
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
                    req.body = { ...req.body, isStaff: false };
                }
                if (user) {
                    req.body = { ...req.body, isStaff: true };
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
