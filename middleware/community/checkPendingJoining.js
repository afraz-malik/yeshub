const Knowledge = require('../../src/model/knowledgeGroup/knowledgeGroup');
const { validateID } = require('../../routes/modules/generalModules/general');

module.exports = function (req, res, next) {
    try {
        console.log(req);
        Knowledge.findOne({ _id: req.query.ID, pendingJoining: { $in: [req.body.userID] } }, (err, Community) => {
            if (err) {
                throw err;
            }
            console.log(Community)
            if (!Community) {
                return res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    message: CONSTANTS.PENING_JOING_REQUEST_NOT_FOUND,
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