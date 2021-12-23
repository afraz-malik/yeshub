const router = require('express').Router();

const User = require('../../../../src/model/user/userSchema');

router.route('/:ID').get(getPublicProfile)

function getPublicProfile(req, res) {
    console.log(' [GET] /public/profile/', req.params.ID );
        var query = { _id: req.params.ID };
        User.findOne(query)
            .select({
                metaInfo: 1,
                otherInfo: 1,
                PersonalStatement: 1,
                userImage: 1,
                userName: 1,
                email: 1,
            })
            .then(function (result) {
                console.log(result);
                res

                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.USER_FOUND,
                        data: result,
                    })
            })
            .catch((err) => {
                console.log(err);// err;
            });
}


module.exports = router;