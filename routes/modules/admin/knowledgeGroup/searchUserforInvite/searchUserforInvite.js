const express = require('express');
const router = express.Router();
const User = require('../../../../../src/model/user/userSchema');
const { checkCommunityAdmin, getModerators } = require('../../../generalModules/communityGeneralOperations');
const { validateID } = require('../../../generalModules/general');

router.get('/Search', async (req, res) => {
    if (validateID(req.query.ID)) {
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: CONSTANTS.INVALID_ID
        }).end();
    }
    if (!req.query.keyword) {
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: CONSTANTS.KEYWORD_IS_REQUIRED
        }).end();
    }
    checkAdmin = await checkCommunityAdmin(req.user.ID);
    if (!checkAdmin || checkAdmin === null) {
        return res.status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE).json({
            error: CONSTANTS.UNAUTHORIZED,
            message: CONSTANTS.FORBIDDEN
        }).end();
    }

    let moderators = await getModerators(req.query.ID)

    var query = { _id: { $nin: [moderators.moderators] }, $or: [{ fullName: { $regex: req.query.keyword } }, { userName: { $regex: req.query.keyword } }] };
    var options = {
        select: { userName: 1, fullName: 1, userImage: 1 },
        sort: { createdAt: -1 },
        // populate: [],
        lean: true,
        page: (req.query.page > 0) ? req.query.page : 1 || 1,
        limit: 10
    };
    User.paginate(query, options).then(function (result) {
        return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            message: CONSTANTS.USER_SEARCH_RESULT,
            data: result
        }).end();
    }).catch((err) => {
        throw err;
    });
});

module.exports = router;