const express = require("express");
const router = express.Router();
const User = require("../../../../../src/model/user/userSchema");
const {
    checkCommunityAdmin,
    checkCommunityModerator,
} = require("../../../generalModules/communityGeneralOperations");
const { validateID } = require("../../../generalModules/general");

router.get("/list", async (req, res) => {
    console.log('sssssssssssssssssssssssssss');
    if (validateID(req.query.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    checkAdmin = await checkCommunityAdmin(req.user.ID);
    if (!checkAdmin || checkAdmin === null) {
        checkModerator = await checkCommunityModerator(
            req.user.ID,
            req.query.ID
        );
        if (!checkModerator || checkModerator === null) {
            return res
                .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                .json({
                    error: CONSTANTS.UNAUTHORIZED,
                    message: CONSTANTS.FORBIDDEN,
                })
                .end();
        }
    }

    var query = {
        joinedCommunities: { $in: [req.query.ID] },
    };
    var options = {
        select: { userName: 1, userImage: 1, },
        sort: { createdAt: -1 },
        lean: true,
        populate: {
            path: 'assignedRoles', select: 'roleName'
        },
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };
    User.paginate(query, options)
        .then(function (result) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.LIST_OF_COMMUITY_USERS,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = router;
