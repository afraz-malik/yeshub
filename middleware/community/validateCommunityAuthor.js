const Community = require('../../src/model/knowledgeGroup/knowledgeGroup');
const { validateID } = require('../../routes/modules/generalModules/general');

module.exports = function (req, res, next) {

    Community.findOne({ _id: req.query.ID, author: req.user.ID }, (err, Community) => {
        if (err) {
            throw err;
        }
        if (!Community) {
            return res.status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE).json({
                message: CONSTANTS.INVALID_ADMIN,
            }).end();
        }
        next()
    })
}
