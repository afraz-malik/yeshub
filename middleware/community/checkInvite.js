const Knowledge = require('../../src/model/knowledgeGroup/knowledgeGroup');
const { validateID } = require('../../routes/modules/generalModules/general');

module.exports = function (req, res, next) {
    try {
        Knowledge.findOne({ _id: req.query.ID, invitesModerator: { $in: [req.body.userID] } }, (err, Community) => {
            if (err) {
                throw err;
            }
            if (Community) {
                return res.status(CONSTANTS.SERVER_ALREADY_REPORTED_HTTP_CODE).json({
                    message: CONSTANTS.ALREADY_INVITE_SEND,
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