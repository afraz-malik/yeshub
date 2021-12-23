const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const json2xls = require("json2xls");

//const CONSTANTS = require('../../../Enum/constants');
const { EventEmitter, EventlogIt } = require("../events/eventListener");
const { generateHash } = require("../generalModules/general");
const auth = require("../../../middleware/auth");
const User = require("../../../src/model/user/userSchema");
const roleSchema = require("../../../src/model/user/roles/roleSchema");
//middleware to check for userName
const checkUserName = require("../../../middleware/checkUserName");
//middleware check for already exist email address
const checkEmail = require("../../../middleware/checkEmail");
//middleware check user exist or not
const checkUser = require("../../../middleware/checkUserExistById");
//user general operation functions
const { deleteRequestFiles } = require("../../modules/generalModules/general");
const BannedEmail = require("../user/bannedEmails/banned-email.model");

const {
    checkUserAlreadyEmailVerified,
    checkUserUpdateFirst,
    validateSectionForNull,
    deactivateAccount,
} = require("../generalModules/userGeneralOperations");
const { ImageUploader } = require("../../../middleware/multipleImagesUploads");
const resizeContainer = require("../../../middleware/multipleResizeImages");
const knowledgeGroup = require("../../../src/model/knowledgeGroup/knowledgeGroup");
const checkAdmin = require("../../../middleware/checkAdmin");

router.get("/list", function (req, res) {
    let query = {};
    let options = {
        select: {
            fullName: 1,
            email: 1,
            userName: 1,
            assignedRoles: 1,
            address: 1,
            userImage: 1,
        },
        populate: {
            path: "assignedRoles",
        },
        limit: CONSTANTS.USER_PAGE_SIZE,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
    };
    User.paginate(query, options)
        .then((data) => {
            res.status(200).json({
                status: true,
                data: data,
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
});

router.route("/get/awards").get(getAwards);

function getAwards(req, res) {
    let user = req.query.ID;
    User.findOne({ _id: req.query.ID }, "receivedAward")
        .then((doc) => {
            res.json({ data: doc.receivedAward, message: "Awards" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

router.post(
    "/register",
    [checkEmail, checkUserName],
    async function (req, res) {
        let defaultCommunities = await knowledgeGroup
            .find({ joingType: 3 })
            .distinct("_id");

        let banned = await BannedEmail.findOne({ email: req.body.email });
        if (banned) {
            return res
                .status(400)
                .json({ message: CONSTANTS.EMAIL_BANNED_MSG });
        }
        const newUser = new User();
        //validating data
        var user = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            roleId: req.body.roleId,
        };
        const { error } = newUser.validateUser(user);
        if (error) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            });
        }
        if (!mongoose.Types.ObjectId.isValid(req.body.roleId)) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_USER_ID,
            });
        }
        newUser.userName = req.body.userName;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.assignedRoles = req.body.roleId;
        newUser.joinedCommunities = defaultCommunities;
        newUser.hash = generateHash(15);
        newUser.save((err, user) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: error.details[0].message,
                    })
                    .end();
            }
            EventlogIt("UserNewRegister", user);
            const token = newUser.generateToken();
            //EventlogIt('UserNewRegister', user);
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .header("x-auth-token", token)
                .json({
                    message: CONSTANTS.USER_REGISTRATION_OK,
                    data: _.pick(user, [
                        "_id",
                        "fullName",
                        "email",
                        "userName",
                        "assignedRoles",
                        "address",
                        "userImage",
                    ]),
                })
                .end();
        });
    }
);

router.put("/update", [auth, checkUser], async function (req, res) {
    const upDateUser = new User();
    //validating data
    var user = {
        PersonalStatement: req.body.PersonalStatement,
    };
    const { error, value } = upDateUser.validateUpdateUser(user);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    //updating User
    const result = await User.findByIdAndUpdate(
        req.user.ID,
        {
            $set: {
                PersonalStatement: value.PersonalStatement,
            },
        },
        { new: true }
    );
    if (result === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    }

    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        message: CONSTANTS.USER_UPDATE_SUCCESSFULLY,
        data: _.pick(result, ["_id", "PersonalStatement"]),
    });
});

router.put("/moreInfo", [auth, checkUser], async function (req, res) {
    const upDateUser = new User();
    const result = await User.findByIdAndUpdate(
        req.user.ID,
        {
            $set: {
                "metaInfo.organization": req.body.organization,
                "metaInfo.position": req.body.position,
                "metaInfo.departmentTeam": req.body.departmentTeam,
                "metaInfo.supervisorManager": req.body.supervisorManager,
                "metaInfo.homeOffice": req.body.homeOffice,
                "metaInfo.projectProgram": req.body.project || [],
            },
        },
        { new: true }
    );
    if (result === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    }
    await checkUserUpdateFirst(req.user.ID);
    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        message: CONSTANTS.USER_UPDATE_SUCCESSFULLY,
        data: _.pick(result, ["_id", "metaInfo"]),
    });
});

router.put("/otherInfo", [auth, checkUser], async function (req, res) {
    var tempValues = [];
    for (key in req.body) {
        if (req.body[key] === null) {
            req.body[key] = "";
        }
        if (req.body[key] instanceof Object) {
            for (_key in req.body[key]) {
                if (req.body[key[_key]] === null) {
                    req.body[key][_key] = "";
                }
            }
        }
    }
    let value = req.body;

    //updating User
    const result = await User.findByIdAndUpdate(
        req.user.ID,
        {
            $set: {
                "otherInfo.identifyAs": value.identifyAs,
                "otherInfo.disabilityGroup": value.disabilityGroup,
                "otherInfo.city": value.city,
                "otherInfo.nationalities": value.nationalities,
                "otherInfo.birthDetail": value.birthDetail,
            },
        },
        { new: true }
    );
    if (result === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    }
    await checkUserUpdateFirst(req.user.ID);
    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        message: CONSTANTS.USER_UPDATE_SUCCESSFULLY,
        data: _.pick(result, ["_id", "otherInfo"]),
    });
});

//update role
router.put("/updateRole", [auth], async function (req, res) {
    const upDateUser = new User();

    //validating data
    var role = {
        roleId: req.body.roleId,
    };

    const { error } = upDateUser.validateUserRole(role);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.roleId)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_USER_ID,
            })
            .end();
    }

    //updating User
    const result = await User.findByIdAndUpdate(
        req.user.ID,
        {
            $addToSet: {
                assignedRoles: req.body.roleId,
            },
        },
        { new: true }
    );

    if (result === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    }
    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        message: CONSTANTS.USER_UPDATE_SUCCESSFULLY,
        data: _.pick(result, ["assignedRoles"]),
    });
});
//change password:
router.put("/changePassword", [auth, checkUser], async (req, res) => {
    const UserModel = new User();
    const user = await User.findById(req.user.ID);
    if (user === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    }
    const password = req.body.password;
    const { error, value } = UserModel.validateChangePassword(req.body);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    const newpassword = UserModel.encryptPassword(value.newPassword);

    const compareResult = UserModel.comparePassword(password, user.password);
    if (compareResult === false) {
        return res
            .status(CONSTANTS.SERVER_CONFLICT_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.OLD_PASSWORD_WRONG,
            })
            .end();
    }

    // const NewEncrepted = UserModel.encryptPassword(value.password);
    User.updateOne(
        { _id: user._id },
        {
            $set: {
                password: newpassword,
            },
        }
    )
        .then((user) => {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.PASSWORD_CHANGED,
                    data: _.pick(user, [
                        "_id",
                        "fullName",
                        "email",
                        "userName",
                        "assignedRoles",
                        "address",
                        "userImage",
                    ]),
                })
                .end();
        })
        .catch((err) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.message,
                    })
                    .end();
            }
        });
});
//updating image of user
router.post("/updateImage", [auth, checkUser], async (req, res) => {
    const UserModel = new User();
    const user = await User.findById(req.user.ID);
    if (user === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    }

    var userImage = {
        image: req.body.images,
    };

    const { error, value } = UserModel.validateImage(userImage);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    } else {
        user.userImage = value.image;
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
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.IMAGE_CHANGED,
                    data: _.pick(user, ["_id", "userImage"]),
                })
                .end();
        });
    }
});

//login api
router.post("/login", function (req, res) {
    const loginUser = new User();
    //validating data
    const { error, value } = loginUser.loginFormUser(req.body);
    if (error) {
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: error.details[0].message,
        });
    }
    User.findOne({
        $or: [{ email: value.email }, { userName: value.email }],
    })
        .populate({ path: "assignedRoles", model: roleSchema })
        .then(function (userGet) {
            if (!userGet) {
                return res
                    .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                    .json({
                        message: "Email/Username is invalid",
                    })
                    .end();
            }

            const auth = loginUser.comparePassword(
                value.password,
                userGet.password
            );
            console.log(auth);
            if (auth === true) {
                const token = userGet.generateToken();
                const role = userGet.assignedRoles[0].roleName;
                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .header("expID", userGet._id)
                    .json({
                        message: CONSTANTS.USER_LOGIN_OK,
                        token: token,
                        role: role,
                    })
                    .end();
            } else {
                return res
                    .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                    .json({
                        message: "Password is invalid",
                    })
                    .end();
            }
        })
        .catch((err) => {
            return res
                .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                .json({
                    message: CONSTANTS.INTERNAL_ERROR,
                    data: err.message,
                })
                .end();
        });
});

//activation emails
router.post("/activateAccount", async (req, res) => {
    const validate = new User();
    const { error, value } = validate.validateActivate(req.body);
    if (error) {
        return res
            .status(403)
            .json({
                error: "Validation Error Occur",
                message: error.details[0].message,
            })
            .end();
    }
    const result = await checkUserAlreadyEmailVerified(value.email);
    if (result === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    } else if (result === true) {
        return res
            .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
            .json({
                message: CONSTANTS.EMAIL_ALREADY_VERIFIED,
            })
            .end();
    }
    //updating User
    User.updateOne(
        { hash: value.hash },
        {
            $set: {
                hash: null,
                "progressBar.email": true,
            },
        }
    )
        .then((result) => {
            if (result === null) {
                return res
                    .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
                    .json({
                        message: CONSTANTS.CODE_EXPIRED,
                    })
                    .end();
            }
            if (result.nModified === 0) {
                return res
                    .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
                    .json({
                        message: CONSTANTS.CODE_EXPIRED,
                    })
                    .end();
            }
            EventlogIt("verifyEmail", {
                email: value.email,
                points: CONSTANTS.VERIFY_EMAIL_POINT,
            });
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.ACTIVATED,
                data: true,
            });
        })
        .catch((err) => {
            return res
                .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                .json({
                    message: CONSTANTS.INTERNAL_ERROR,
                    data: err.message,
                })
                .end();
        });
});

//email not receivered request for new email
router.post("/resendActivate", async (req, res) => {
    var userModel = new User();
    const { error, value } = userModel.validateActivateAgain(req.body);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    const result = await checkUserAlreadyEmailVerified(value.email);
    if (result === null) {
        return res
            .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
            .json({
                message: CONSTANTS.USER_NOT_FOUND,
            })
            .end();
    } else if (result === true) {
        return res
            .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
            .json({
                message: CONSTANTS.EMAIL_ALREADY_VERIFIED,
            })
            .end();
    }
    const newHash = generateHash(15);
    User.updateOne(
        { email: value.email },
        {
            $set: {
                hash: newHash,
            },
        },
        { new: true }
    )
        .then((updated) => {
            if (updated === null) {
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.USER_NOT_FOUND,
                    })
                    .end();
            }
            if (updated.nModified == 1) {
                EventlogIt("resendEmail", { email: value.email });
                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.EMAIL_SEND,
                    })
                    .end();
            }
            return res
                .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                .json({
                    message: CONSTANTS.EMAIL_NOT_EXIST,
                })
                .end();
        })
        .catch((err) => {
            return res
                .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                .json({
                    error: CONSTANTS.INTERNAL_ERROR,
                    message: error.details[0].message,
                })
                .end();
        });
});

//deactivate account
router.delete("/deactivateAccount", [auth, checkUser], (req, res) => {
    //remove all data related to user
    User.findByIdAndDelete(req.user.ID)
        .then(async (result) => {
            if (result) {
                await deactivateAccount(req.user.ID);
                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.DEACTIVATED_ACCOUNT_SUCCESSFULLY,
                    })
                    .end();
            }
        })
        .catch((err) => {
            return res
                .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                .json({
                    message: CONSTANTS.INTERNAL_ERROR,
                    data: err.message,
                })
                .end();
        });
});

//change username account
router.put("/changeUsername", [auth, checkUser], (req, res) => {
    const change = new User();
    const { error, value } = change.validatechangeUserName(req.body);
    if (error) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message,
            })
            .end();
    }
    //remove all data related to user
    var query = {
        _id: { $nin: [req.user.ID] },
        $or: [{ userName: { $regex: value.username } }],
    };

    User.findOne(query)
        .then(async (result) => {
            if (result) {
                return res
                    .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
                    .json({
                        message: CONSTANTS.USERNAME_AVAILABLE_FAILED,
                    })
                    .end();
            }
            User.updateOne(
                { _id: req.user.ID },
                {
                    $set: { userName: value.username },
                },
                {
                    new: true,
                }
            )
                .then((User) => {
                    return res
                        .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                        .json({
                            message: CONSTANTS.UPDATED_SUCCESSFULLY,
                            data: User,
                        })
                        .end();
                })
                .catch((err) => {
                    return res
                        .status(
                            CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE
                        )
                        .json({
                            message: CONSTANTS.INTERNAL_ERROR,
                            data: err.message,
                        })
                        .end();
                });
        })
        .catch((err) => {
            return res
                .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                .json({
                    message: CONSTANTS.INTERNAL_ERROR,
                    data: err.message,
                })
                .end();
        });
});

router.route("/search").get([auth, checkAdmin], searchUser);

async function searchUser(req, res) {
    var regex = new RegExp(req.query.search, "i");
    let query = { $or: [{ userName: regex }, { email: regex }] };
    let options = {
        select: "userName email userImage metaInfo assignedRoles",
        populate: "assignedRoles",
        limit: CONSTANTS.USER_SEARCH_PAGE_SIZE,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
    };
    User.paginate(query, options)
        .then((users) => {
            res.json({ status: true, data: users, count: users.length });
        })
        .catch((error) => res.json(error));
}

router.route("/search/member/in/community").get([auth], searchMember);

async function searchMember(req, res) {
    var regex = new RegExp(req.query.search, "i");
    let query = {
        $or: [{ userName: regex }, { email: regex }],
        joinedCommunities: { $in: [req.query.ID] },
    };
    let options = {
        select: "userName email userImage",
        limit: CONSTANTS.USER_SEARCH_PAGE_SIZE,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        lean: true,
    };
    User.paginate(query, options)
        .then((users) => {
            res.json({ status: true, data: users, count: users.length });
        })
        .catch((error) => res.json(error));
}

router.route("/action/makeit/staff/:ID").put(makeItStaff);
function makeItStaff(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.ID },
        { $set: { assignedRoles: [CONSTANTS.ROLE_STAFF] } }
    )
        .then((docs) => {
            if (docs) {
                return res.json({ message: "made staff successfully" });
            }

            return res.status(422).json({ message: "Operation Failed" });
        })
        .catch((err) => res.json({ message: err.message }));
}

router.route("/action/makeit/user/:ID").put(makeItUser);
function makeItUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.ID },
        { $set: { assignedRoles: [CONSTANTS.ROLE_USER] } }
    )
        .then((docs) => {
            if (docs) {
                return res.json({ message: "made staff successfully" });
            }

            return res.status(422).json({ message: "Operation Failed" });
        })
        .catch((err) => res.json({ message: err.message }));
}

router.route("/exports/in/community/:comID").get(exportsMembers);

async function exportsMembers(req, res) {
    let users = await User.find(
        { joinedCommunities: { $in: req.params.comID } },
        "userName email"
    );
    let jsonusers = transformjson(users);
    let xls = json2xls(jsonusers);
    fs.writeFileSync("users.xlsx", xls, "binary");
    res.download("users.xlsx", () => {
        fs.unlinkSync("users.xlsx");
    });
}

function transformjson(json) {
    let data = [["_id", "user name", "email"]];
    json.forEach((user) => {
        let ar = [user._id, user.userName, user.email];
        data.push(ar);
    });
    return data;
}

module.exports = router;
