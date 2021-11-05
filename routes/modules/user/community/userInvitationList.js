const express = require('express');
const router = express.Router();
const Knowledge = require('../../../../src/model/knowledgeGroup/knowledgeGroup');

router.get('/list', (req, res) => {
    var query = { invitesModerator: { $in: [req.user.ID] } };
    var options = {
        select: { _id: 1, logo: 1, name: 1, slug: 1 },
        sort: { createdAt: -1 },
        lean: true,
        page: (req.query.page > 0) ? req.query.page : 1 || 1,
        limit: 10
    };
    Knowledge.paginate(query, options).then(function (result) {
        return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            message: CONSTANTS.INVITE_LIST,
            data: result
        }).end();
    }).catch((err) => {
        throw err;
    });
});

module.exports = router;