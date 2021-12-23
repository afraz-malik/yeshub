const Knowledge = require('../src/model/knowledgeGroup/knowledgeGroup');
const { deleteRequestFiles } = require('./../routes/modules/generalModules/general');

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
        Knowledge.findOne({ name: req.body.name }, (err, knowledge) => {
            if (err) {
                deleteRequestFiles(req.body.images);
                throw err;
            }
            if (knowledge) {
                //deleting upload image
                deleteRequestFiles(req.body.images);
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