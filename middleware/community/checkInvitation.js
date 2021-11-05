const Knowledge = require('../../src/model/knowledgeGroup/knowledgeGroup');
const { validateID } = require('../../routes/modules/generalModules/general');

module.exports = function (req, res, next) {
    try {
        console.log('comID', req.query.ID);
        console.log('userID', req.body.userID)
        Knowledge.findOne({ _id: req.query.ID, invitesModerator: { $in: [req.user.ID] } }, (err, Community) => {
            if (err) {
                throw err;
            }
            console.log(Community);
            if (!Community) {
                return res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    message: CONSTANTS.NO_INVITATION_FOUND,
                }).end();
            }
            if (Community === null) {
                return res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    message: CONSTANTS.NO_INVITATION_FOUND,
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