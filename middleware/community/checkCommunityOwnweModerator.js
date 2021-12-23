const Community = require('../../src/model/knowledgeGroup/knowledgeGroup');
const { validateID } = require('../../routes/modules/generalModules/general');

module.exports = function (req, res, next) {

    Community.findOne({ _id: req.query.ID, author: req.user.ID }, (err, Communityy) => {
        if (err) {
            throw err;
        }
        if (!Communityy) {
            Community.findOne({ _id: req.query.ID, moderators: { $in: [req.user.ID] } }, (err, CommunityModerator) => {
                if (err) {
                    throw err;
                }

                if (!CommunityModerator) {
                    return res.status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE).json({
                        message: CONSTANTS.INVALID_ADMIN_MODERATOR,
                    }).end();
                }
                next()
            })


        }
        next();
    })
}
