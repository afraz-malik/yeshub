const express = require("express");
const router = express.Router();
//middlewares
const checkEmail = require("../../../../middleware/checkEmail");
const checkUser = require("../../../../middleware/checkUserExistById");
//email
const { sendingEmail, sendEmailForgot } = require("../../email/email2");
//user Model
const User = require("../../../../src/model/user/userSchema");
//general Modules
const { generateHash } = require("../../generalModules/general");
//const {randomString} = require('../../generalModules/general');
const baseurl = require("../../../../URL/urls").base_url;

//inilizing object of User Class
const UserModel = new User();

router.post("/", async function (req, res) {
    console.log(req.body.email);
    if (!req.body.email) {
        res.status(403).json({
            status: false,
            message: "Please provide email",
        });
    }
    const email = {
        email: req.body.email,
    };

    // const { error } = UserModel.validateForgotEmail(req.body.email);
    // if (error) {
    //     console.log('validation error:');
    //     console.log(error);
    //     return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
    //         error: CONSTANTS.JOI_VALIDATION_ERROR,
    //         message: error.details[0].message
    //     });
    // }

    //check for email exist or not
    const result = User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res
                .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                .json({
                    error: CONSTANTS.INTERNAL_ERROR,
                    message: err.message,
                })
                .end();
        }
        if (!user) {
            return res
                .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                .json({
                    error: CONSTANTS.NO_CONTENT,
                    message: CONSTANTS.EMAIL_NOT_EXIST,
                })
                .end();
        }
        const randomString = generateHash(15);
        user.hash = randomString;
        //(Email, firstName, lastName, link, btnText, notification, SubjectText) {
        // let link = `http://yeshub.maqware.com/auth/reset-password/${randomString}`;
        let link = `https://${baseurl}/reset/${req.body.email}/${randomString}`;
        // const emailStatus = sendingEmail(user.email, user.userName, link, "change Password", "reset password request received", "Password Reset Email");
        sendEmailForgot(user.userName, user.email, "Forgot Password", link);
        user.save((err, user) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.message,
                    })
                    .end();
            }
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.EMAIL_SEND,
            });
        });
    });
});

//check hash exist or not
router.post("/check", async (req, res) => {
    var forgot = {
        hash: req.body.hash,
    };
    const { error } = UserModel.checkHash(forgot);
    if (error) {
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: error.details[0].message,
        });
    }
    User.findOne({ hash: req.body.hash }, (err, user) => {
        if (err) {
            return res
                .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                .json({
                    error: CONSTANTS.INTERNAL_ERROR,
                    message: err.message,
                })
                .end();
        }

        if (!user) {
            return res
                .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                .json({
                    message: CONSTANTS.TOKEN_IS_INVALID,
                })
                .end();
        }

        return res
            .status(CONSTANTS.SERVER_OK_HTTP_CODE)
            .json({
                message: CONSTANTS.TOKEN_IS_VALID,
                data: User,
            })
            .end();
    });
});

router.post("/updatePasword", async (req, res) => {
    var reset = {
        password: req.body.password,
        hash: req.body.hash,
        email: req.body.email,
    };
    const { error } = UserModel.reset(reset);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    User.findOne(
        { email: req.body.email, hash: req.body.hash },
        (err, user) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.message,
                    });
            }
            if (!user) {
                return res
                    .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
                    .json({
                        error: CONSTANTS.BAD_REQUEST,
                        message: CONSTANTS.HASH_IS_NOT_VALID,
                    })
                    .end();
            }

            user.password = UserModel.encryptPassword(req.body.password);
            user.hash = null;
            user.save((err, user) => {
                if (err) {
                    return res
                        .status(
                            CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE
                        )
                        .json({
                            error: CONSTANTS.INTERNAL_ERROR,
                            message: err.message,
                        })
                        .end();
                }
                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.PASSWORD_RESET_SUCCESSFULLY,
                    })
                    .end();
            });
        }
    );
});

module.exports = router;
