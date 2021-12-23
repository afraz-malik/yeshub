const Community = require("../../src/model/knowledgeGroup/knowledgeGroup");
const { validateID } = require("../../routes/modules/generalModules/general");

module.exports = function (req, res, next) {
    console.log(' check community ...');
    try {
        //checking username already exist or not
        if (!req.query.ID) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: CONSTANTS.ID_IS_REQUIRED,
                })
                .end();
        }
        //validating ID
        if (validateID(req.query.ID)) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: CONSTANTS.INVALID_ID,
                })
                .end();
        }

        Community.findOne({ _id: req.query.ID }, (err, Community) => {
            if (err) {
                throw err;
            }
            if (!Community) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.COMMUNITY_NOT_EXIST,
                    })
                    .end();
            }
            req.body.type = Community.joingType;

            next();
        });
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
