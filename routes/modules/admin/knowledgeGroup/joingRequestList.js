const express = require('express');
const router = express.Router();
const Knowledge = require('../../../../src/model/knowledgeGroup/knowledgeGroup');
const User = require('../../../../src/model/user/userSchema');
const { checkCommunityAdmin, checkCommunityModerator } = require('../../generalModules/communityGeneralOperations');
const { validateID, } = require('../../generalModules/general');

router.get('/list', async (req, res) => {
    if (validateID(req.query.ID)) {
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: CONSTANTS.INVALID_ID
        }).end();
    }
    checkAdmin = await checkCommunityAdmin(req.user.ID);
    if (!checkAdmin || checkAdmin === null) {
        checkModerator = await checkCommunityModerator(req.user.ID, req.query.ID);
        if (!checkModerator || checkModerator === null) {
            return res.status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE).json({
                error: CONSTANTS.UNAUTHORIZED,
                message: CONSTANTS.FORBIDDEN
            }).end();
        }
    }

    var query = {
        _id: req.query.ID,
    };
    var options = {
        sort: { createdAt: -1 },
        populate: [{ path: 'pendingJoining', model: User, select: { '_id': 1, 'userName': 1 } }],
        lean: true,
        page: (req.query.page > 0) ? req.query.page : 1 || 1,
        limit: 10
    };
    Knowledge.paginate(query, options).then(function (result) {
        let attributes = _.pick(result, ["totalDocs", "limit", "totalPages", "page", "pagingCounter", "hasPrevPage", "hasNextPage", "prevPage", "nextPage"]);
        attributes['docs'] = _.map(result.docs, function (object) {
            return _.pick(object, ['_id', 'pendingJoining']);
        })
        return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            message: CONSTANTS.INVITE_LIST,
            data: attributes
        }).end();
    }).catch((err) => {
        throw err;
    });
});

module.exports = router;