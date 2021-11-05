const User = require("../../../src/model/user/userSchema");
const {
    validateID,
} = require("../../../routes/modules/generalModules/general");

ObjectId = require("mongodb").ObjectID;
module.exports = function (req, res, next) {
    try {
        if (validateID(req.query.ID)) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: CONSTANTS.INVALID_ID,
                })
                .end();
        }
        //checking user exist or not
        User.findOne(
            { _id: req.user.ID, savedPosts: req.query.ID },
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
                if (user) {
                    return res
                        .status(CONSTANTS.SERVER_ALREADY_REPORTED_HTTP_CODE)
                        .json({
                            message: CONSTANTS.ALREADY_SAVED_SUCCESSFULLY,
                        })
                        .end();
                }
                next();
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
