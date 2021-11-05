const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
    checkCommunityAdmin,
    checkCommunityModerator,
    deleteCommunityPosts,
} = require("../../generalModules/communityGeneralOperations");
//check for duplicate category in db using middleware
const checkForDuplicate = require("../../../../middleware/checkKnowledgeGroupExist");
const Knowledge = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../../src/model/user/userSchema");
const Message = require("../../chat/message.model");

const instance = new Knowledge();
const {
    slug,
    deleteImage,
    validateID,
    deleteRequestFile,
    deleteRequestFiles,
} = require("../../generalModules/general");
const {
    ImageUploader,
} = require("../../../../middleware/multipleImagesUploads");
const resizeContainer = require("../../../../middleware/multipleResizeImages");
const knowledgeGroup = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const CheckAdmin = require("../../../../middleware/checkAdmin");

// get communities list (it does not include archived communities)
router.get("/list", async (req, res) => {
    const { ID } = req.user;
    console.log("req.user: ", req.user);
    let archivedCommunities = await knowledgeGroup
        .find({ isArchived: true })
        .distinct("_id");
    var query = { _id: { $nin: archivedCommunities } };
    if (["Moderator", "User"].includes(req.user.role)) {
        query = { ...query, moderators: { $in: ID } };
    }

    var options = {
        sort: { createdAt: -1 },
        populate: [
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
            // {
            //     path: "pendingJoining",
            //     model: User,
            //     select: { _id: 1, userName: 1, userImage: 1, email: 1 },
            // },
            {
                path: "moderators",
                model: User,
                select: { _id: 1, userName: 1 },
            },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: req.query.limit || 30,
    };

    Knowledge.paginate(query, options)
        .then(function (result) {
            let data = result.docs.map((itm) => {
                return {
                    ...itm,
                    pendingJoining: itm.pendingJoining.length,
                    pendingPosts: itm.pendingPosts
                        ? itm.pendingPosts.length
                        : 0,
                };
            });
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.LIST_OF_COMMUITIES,
                    data: { ...result, docs: data },
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

//adding community
router.post(
    "/add",
    [ImageUploader(1, "knowledge"), resizeContainer, checkForDuplicate],
    async (req, res) => {
        checkAdmin = await checkCommunityAdmin(req.user.ID);
        if (!checkAdmin || checkAdmin === null) {
            return res
                .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                .json({
                    error: CONSTANTS.UNAUTHORIZED,
                    message: CONSTANTS.FORBIDDEN,
                })
                .end();
        }
        const knowledeAdd = new Knowledge();
        const knowledgeRequest = {
            name: req.body.name,
            description: req.body.description,
            slug: slug(req.body.name),
            logo: req.body.images[0],
            joingType: req.body.joingType,
            rules: req.body.rules,
            autoPE: req.body.autoPE,
        };

        const { error, value } =
            instance.validateKnowledgeGroup(knowledgeRequest);
        //check for validating data
        if (error) {
            deleteRequestFiles(req.body.images);
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }

        knowledeAdd.name = value.name;
        knowledeAdd.description = value.description;
        knowledeAdd.slug = value.slug;
        knowledeAdd.logo = req.body.images[0];
        knowledeAdd.author = req.user.ID;
        knowledeAdd.published = true;
        knowledeAdd.joingType = value.joingType || 1;
        knowledeAdd.rules = value.rules || [];
        knowledeAdd.autoPE = value.autoPE;

        knowledeAdd.save(async (err, knowlede) => {
            if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.details[0].message,
                    })
                    .end();
            }
            let msg = new Message({
                message: "Welcome to " + value.name,
                community: knowlede._id,
                conversationID: "in-" + knowlede._id,
            });
            let saved = await msg.save();
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.ADD_SUCCESSFULLY,
                    data: knowlede,
                })
                .end();
        });
    }
);
//updating community information
router.put("/update", async (req, res) => {
    if (validateID(req.body.ID)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    Knowledge.findById(req.body.ID, async (err, knowledge) => {
        if (err) {
            throw err;
        }
        if (knowledge === null) {
            if (req.file) {
                deleteRequestFile(req.file);
            }
            return res
                .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                .json({
                    message: CONSTANTS.NOT_EXIST,
                })
                .end();
        }
        //validating request
        const validateSchema = {
            name: req.body.name,
            description: req.body.description,
            slug: slug(req.body.name),
            joingType: req.body.joingType,
            rules: req.body.rules,
            autoPE: req.body.autoPE,
        };
        const { error, value } =
            instance.validateUpdateKnowledgeGroup(validateSchema);
        if (error) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }
        checkAdmin = await checkCommunityAdmin(req.user.ID);
        if (!checkAdmin || checkAdmin === null) {
            checkModerator = await checkCommunityModerator(
                req.user.ID,
                req.body.ID
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
        Knowledge.findByIdAndUpdate(
            req.body.ID,
            {
                $set: value,
            },
            { new: true },
            async (err, updateknowledge) => {
                if (err) {
                    throw err;
                }
                if (updateknowledge === null) {
                    return res
                        .status(SERVER_NO_CONTENT_HTTP_CODE)
                        .json({
                            message: CONSTANTS.NOT_EXIST,
                        })
                        .end();
                }
                return res
                    .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                    .json({
                        message: CONSTANTS.UPDATED_SUCCESSFULLY,
                        data: updateknowledge,
                    })
                    .end();
            }
        );
    });
});
//updating community image
router.put(
    "/updatelogo",
    [ImageUploader(1, "knowledge"), resizeContainer],
    async (req, res) => {
        const schema = {
            logo: req.body.images[0],
        };
        const { error, value } = instance.validateImage(schema);
        console.log("value: ", value);
        if (error) {
            //if error in validating data we have to delete uploaded file
            if (req.body.images) {
                deleteRequestFiles(req.body.images);
            }
            if (validateID(req.body.ID)) {
                return res
                    .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                    .json({
                        error: CONSTANTS.JOI_VALIDATION_ERROR,
                        message: CONSTANTS.INVALID_ID,
                    })
                    .end();
            }
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }
        Knowledge.findById(req.body.ID, async (err, knowledge) => {
            if (err) {
                throw err;
            }
            if (knowledge === null) {
                if (req.body.images) {
                    deleteRequestFiles(req.body.images);
                }
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.NOT_EXIST,
                    })
                    .end();
            }
            checkAdmin = await checkCommunityAdmin(req.user.ID);
            if ([undefined, null, false].includes(checkAdmin)) {
                checkModerator = await checkCommunityModerator(
                    req.user.ID,
                    req.body.ID
                );
                if ([undefined, null, false].includes(checkModerator)) {
                    return res
                        .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
                        .json({
                            error: CONSTANTS.UNAUTHORIZED,
                            message: CONSTANTS.FORBIDDEN,
                        })
                        .end();
                }
            }

            Knowledge.findByIdAndUpdate(
                req.body.ID,
                {
                    $set: {
                        logo: value.logo,
                    },
                },
                { new: true },
                async (err, updateknowledge) => {
                    if (err) {
                        throw err;
                    }
                    if (updateknowledge === null) {
                        return res
                            .status(SERVER_NO_CONTENT_HTTP_CODE)
                            .json({
                                message: CONSTANTS.NOT_EXIST,
                            })
                            .end();
                    }
                    //deleting image
                    deleteImage(knowledge.image);
                    return res
                        .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                        .json({
                            message: CONSTANTS.UPDATED_SUCCESSFULLY,
                            data: updateknowledge,
                        })
                        .end();
                }
            );
        });
    }
);

//updating cover Image
router.put(
    "/updateCoverImage",
    [ImageUploader(1, "knowledge"), resizeContainer],
    async (req, res) => {
        const schema = {
            logo: req.body.images[0],
        };
        const { error, value } = instance.validateImage(schema);
        if (error) {
            //if error in validating data we have to delete uploaded file
            if (req.file) {
                deleteRequestFiles(req.body.images);
            }
            if (validateID(req.body.ID)) {
                return res
                    .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                    .json({
                        error: CONSTANTS.JOI_VALIDATION_ERROR,
                        message: CONSTANTS.INVALID_ID,
                    })
                    .end();
            }
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.JOI_VALIDATION_ERROR,
                    message: error.details[0].message,
                })
                .end();
        }
        Knowledge.findOne({ _id: req.body.ID }, async (err, knowledge) => {
            if (err) {
                throw err;
            }
            if (knowledge === null) {
                if (req.file) {
                    deleteRequestFiles(req.body.images);
                }
                return res
                    .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                    .json({
                        message: CONSTANTS.NOT_EXIST,
                    })
                    .end();
            }
            checkAdmin = await checkCommunityAdmin(req.user.ID);
            if (!checkAdmin || checkAdmin === null) {
                checkModerator = await checkCommunityModerator(
                    req.user.ID,
                    req.body.ID
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
            Knowledge.findByIdAndUpdate(
                req.body.ID,
                {
                    $set: {
                        coverImage: value.logo,
                    },
                },
                { new: true },
                async (err, updateknowledge) => {
                    if (err) {
                        throw err;
                    }
                    if (updateknowledge === null) {
                        return res
                            .status(SERVER_NO_CONTENT_HTTP_CODE)
                            .json({
                                message: CONSTANTS.NOT_EXIST,
                            })
                            .end();
                    }
                    //deleting image
                    deleteImage(knowledge.image);
                    return res
                        .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                        .json({
                            message: CONSTANTS.UPDATED_SUCCESSFULLY,
                            data: updateknowledge,
                        })
                        .end();
                }
            );
        });
    }
);

//archived Community
router.put("/archived/:id", CheckAdmin, (req, res) => {
    if (validateID(req.params.id)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    Knowledge.findOneAndUpdate(
        { _id: req.params.id },
        { isArchived: true },
        { upsert: false, new: true }
    )
        .then((data) => {
            res.status(200).json({
                status: true,
                data: data,
                message: "Community archived successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
});

//remove community from archived
router.put("/archived/remove/:id", CheckAdmin, (req, res) => {
    if (validateID(req.params.id)) {
        return res
            .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
            .json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID,
            })
            .end();
    }
    Knowledge.findOneAndUpdate(
        { _id: req.params.id },
        { isArchived: false },
        { upsert: false, new: true }
    )
        .then((data) => {
            res.status(200).json({
                status: true,
                data: data,
                message: "Community restored successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
});

// get archived communities
// get communities list (it does not include archived communities)
router.get("/archive/list", CheckAdmin, async (req, res) => {
    var query = { isArchived: true };
    var options = {
        sort: { createdAt: -1 },
        populate: [
            { path: "author", model: User, select: { _id: 1, userName: 1 } },
            {
                path: "pendingJoining",
                model: User,
                select: { _id: 1, userName: 1, userImage: 1 },
            },
            {
                path: "moderators",
                model: User,
                select: { _id: 1, userName: 1 },
            },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 10,
    };

    Knowledge.paginate(query, options)
        .then(function (result) {
            return res
                .status(CONSTANTS.SERVER_OK_HTTP_CODE)
                .json({
                    message: CONSTANTS.LIST_OF_COMMUITIES,
                    data: result,
                })
                .end();
        })
        .catch((err) => {
            throw err;
        });
});

//delete community
router.delete("/delete", async (req, res) => {
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
        return res
            .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
            .json({
                error: CONSTANTS.UNAUTHORIZED,
                message: CONSTANTS.FORBIDDEN,
            })
            .end();
    }
    Knowledge.findByIdAndRemove(req.query.ID, async (err, result) => {
        if (err) throw err;
        if (result === null) {
            return res
                .status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE)
                .json({
                    message: CONSTANTS.NOT_EXIST,
                })
                .end();
        }
        //deleting Image
        if (result.image) {
            deleteImage(result.image);
        }
        await deleteCommunityPosts(req.query.ID);
        res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            message: CONSTANTS.DELETED_SUCCESSFULLY,
            delete: true,
        });
    });
});

// paginated:
router.route("/pending/joining/list").get(CheckAdmin, (req, res) => {
    var options = {
        // sort: { createdAt: -1 },
        select: {
            pendingJoining: 1,
            limit: req.query.limit,
        },
        populate: [
            {
                path: "pendingJoining",
                model: User,
                select: { _id: 1, userName: 1, userImage: 1, email: 1 },
                options: {
                    limit: Number(req.query.limit) || 10,
                    skip: (Number(req.query.page) - 1) * req.query.limit,
                },
            },
        ],
        lean: true,
    };
    const query = { _id: req.query.communityID };
    knowledgeGroup
        .paginate(query, options)
        .then((result) => {
            console.log("--- result pending joining -----");
            console.log(result);
            console.log("--- result pending joining -----");
            res.json({
                data: { ...result, docs: result.docs[0].pendingJoining },
            });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
});

// paginated:
router.route("/moderators/list").get(CheckAdmin, (req, res) => {
    var options = {
        select: {
            moderators: 1,
        },
        populate: [
            {
                path: "moderators",
                model: User,
                select: { _id: 1, userName: 1, userImage: 1, email: 1 },
            },
        ],
        lean: true,
        page: req.query.page > 0 ? req.query.page : 1 || 1,
        limit: 30,
    };
    const query = { _id: req.query.communityID };
    knowledgeGroup
        .paginate(query, options)
        .then((result) => {
            res.json({
                data: { ...result, docs: result.docs[0].moderators },
            });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = router;
