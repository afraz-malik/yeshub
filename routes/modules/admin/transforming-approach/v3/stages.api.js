var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs");
const multer = require("multer");
const SeedStagesData =
    require("../../../../../src/seeder/stageSeeder.v2").seedStageData;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirs = process.cwd() + "/uploads/levels";
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs);
        }
        cb(null, "./uploads/levels");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

const Stage = require("./stages.model");

const auth = require("../../../../../middleware/auth");
const admin = require("../../../../../middleware/checkAdmin");

// router.route('/').post([auth, admin], upload.single('image'), createLevel);
router.route("/").get(getAll);
router.route("/").post(createStage);
router.route("/:id").get(getById);
router
    .route("/:id")
    .put([auth, admin], upload.single("image"), updateStageInfo);
// router.route('/:id').delete([auth, admin], removeLevel);
router.route("/:id").delete([auth, admin], removeStage);

router.route("/add/tool").post(/*[auth, admin],*/ addToolToStageSection);
router.route("/add/section").post(/*[auth, admin], */ addSectionToStage);

router.route("/update/section").put(/*[auth, admin], */ updatSectionInStage);
router
    .route("/update/tool")
    .put(/*[auth, admin], upload.single("file"),*/ updatToolInStage);
router
    .route("/update/toolitem")
    .put(/*[auth, admin], upload.single("file"),*/ updateToolItem);
router
    .route("/remove/toolitem/:stageID/:sID/:tID/:ID")
    .delete(/*[auth, admin], upload.single("file"),*/ removeToolItem);

router.route("/remove/section").put([auth, admin], removeSectionfromStage);
router.route("/remove/tool").put([auth, admin], removeToolFromStage);
router.route("/create/seed").get([auth, admin], createStageSeed);

function createLevel(req, res) {
    let ta = new TransformApproach(req.body);
    ta.save()
        .then((ta) => {
            res.status(200).json({
                status: true,
                message: "Level Created successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

function getAll(req, res) {
    // let language = req.query.language || "eng";
    Stage.find({})
        .then((docs) => {
            // let stages = [];
            // docs.forEach((doc) => {
            //     let stage = doc.stages.filter((prod) => {
            //         return prod.language == language;
            //     });
            //     stages.push(stage[0]);
            // });
            res.status(200).json({
                status: true,
                data: docs,
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                error: error.message,
            })
        );
}

function getById(req, res) {
    LevelStage.findOne({ _id: req.params.id })
        .then((stage) => {
            if (!stage) {
                throw new Error("Required Stage does not exist");
            }
            res.status(200).json({
                status: true,
                data: stage,
                message: "found data",
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                message: error.message,
            })
        );
}

function createStage(req, res) {
    try {
        let stage = new Stage({
            title: req.body.title,
            stageNumber: req.body.stageNumber,
            sections: req.body.sections,
            // levelId: req.body.levelId
        });

        stage
            .save()
            .then((stage) =>
                res.status(200).json({
                    status: true,
                    data: stage,
                    message: "stage added successfully",
                })
            )
            .catch((error) =>
                res.status(500).json({ status: false, message: error.message })
            );
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

function removeLevel(req, res) {
    TransformApproach.findOneAndDelete({ _id: req.params.id })
        .then((doc) => {
            console.log(doc);
            res.status(200).json({
                status: true,
                message: "Level deleted successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                message: error.message,
            })
        );
}

/**
 *
 * @description {add section to stage}
 * @param {stageId, title, body, } req
 * @param {*} res
 */
function addSectionToStage(req, res) {
    const { title, image, description, mainContent, subContent } = req.body;
    let section = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        image,
        mainContent,
        subContent,
    };

    Stage.findOneAndUpdate(
        { _id: req.body.stageID },
        { $push: { sections: section } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            res.status(201).json({
                status: true,
                data: doc,
                message: "section added successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

// added data in response
/**
 *
 * @param {title, body, fileType, image} req
 * @param {*} res
 */
function addToolToStageSection(req, res) {
    const { title, items } = req.body;
    let tool = {
        _id: new mongoose.Types.ObjectId(),
        title,
        items,
    };

    Stage.findOneAndUpdate(
        { _id: req.body.stageID, "sections._id": req.body.sectionID },
        { $push: { "sections.$.tools": tool } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            res.status(200).json({
                status: true,
                data: doc,
                message: "Added Tool successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

/**
 *
 * @param {stgId, sid} req
 * @param {*} res
 */
function removeSectionfromStage(req, res) {
    LevelStage.findOneAndUpdate(
        { _id: req.query.stgId, "stages.language": req.query.language },
        { $pull: { "stages.$.sections": { _id: req.query.sid } } },
        { upsert: false }
    )
        .then((prod) => {
            console.log(prod);
            res.status(200).json({
                status: true,
                message: "Section removed successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

/**
 *
 * @param {stgId, tid} req
 * @param {*} res
 */
function removeToolFromStage(req, res) {
    LevelStage.findOneAndUpdate(
        { _id: req.query.stgId, "stages.language": req.query.language },
        { $pull: { "stages.$.recommendedTools": { _id: req.query.tid } } },
        { upsert: false }
    )
        .then((prod) => {
            res.status(200).json({
                status: true,
                message: "Tool removed successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: false, message: error.message })
        );
}

//
function updatSectionInStage(req, res) {
    Stage.update(
        { _id: req.body.stageID, "sections._id": req.body.sectionID },
        {
            $set: {
                "sections.$.title": req.body.title,
                "sections.$.description": req.body.body,
                "sections.$.image": req.body.image,
                "sections.$.subContent": req.body.subContent,
                "sections.$.mainContent": req.body.mainContent,
            },
        },
        {
            upsert: false,
            new: true,
        }
    )
        .then((doc) => {
            res.status(200).json({
                status: true,
                data: doc,
                message: "Successfully updated Section in Stage",
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                message: error.message,
            })
        );
}

// added data in response
function updatToolInStage(req, res) {
    Stage.findOneAndUpdate(
        { _id: req.body.stageID },
        {
            $set: {
                "sections.$[sec].tools.$[tool].title": req.body.title,
            },
        },
        {
            arrayFilters: [
                { "sec._id": req.body.sectionID },
                { "tool._id": req.body.toolID },
            ],
            upsert: false,
            new: true,
        }
    )
        .then((doc) => {
            res.status(200).json({
                status: true,
                data: doc,
                message: "Tool updated successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                message: error.message,
            })
        );
}

// added data in response
async function removeToolItem(req, res) {
    // try {
    //     const stage = await Stage.findOne({ _id: req.params.stageID });
    //     if (!stage) {
    //         return res
    //             .status(422)
    //             .json({ message: "Stage Against ID does not exist" });
    //     }

    //     const sections = stage.sections.filter(
    //         (section) => section._id == req.params.sID
    //     );
    //     if (sections.length === 0) {
    //         return res
    //             .status(422)
    //             .json({ message: "Section agains section id does not exist" });
    //     }

    //     let tools = sections[0].tools.filter(
    //         (tool) => tool._id == req.params.tID
    //     );

    //     if (tools.length === 0) {
    //         return res
    //             .status(422)
    //             .json({ message: "Tool against provided id does not exist" });
    //     }

    //     const items = tools[0].items;

    //     for (let i = 0; i < items.length; i++) {
    //         if (items[i]._id == req.params.ID) {
    //             items.splice(i, 1);
    //             break;
    //         }
    //     }

    //     const doc = await stage.save();
    //     return res.json({
    //         message: "Successfully removed tool item",
    //         data: doc,
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
    Stage.update(
        {
            _id: req.params.stageID,
            "sections._id": req.params.sID,
        },
        {
            $pull: { "tools.$[tool].items": req.params.ID },

            arrayFilters: [
                // { "secs._id": req.params.sID },
                { "tool._id": req.params.tID },
            ],
        },

        {
            // arrayFilters: [
            //     { "secs._id": req.params.sID },
            //     { "tool._id": req.params.tID },
            // ],
            upsert: false,
            new: true,
        }
    )
        .then((doc) => {
            res.status(200).json({
                status: true,
                data: doc,
                message: "Tool updated successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                message: error.message,
            })
        );
}

// added data in response
function updateToolItem(req, res) {
    Stage.findOneAndUpdate(
        { _id: req.body.stageID },
        {
            $set: {
                "sections.$[sec].tools.$[tool].items.$[item].title":
                    req.body.title,
                "sections.$[sec].tools.$[tool].items.$[item].downloadLink":
                    req.body.downloadLink,
                "sections.$[sec].tools.$[tool].items.$[item].fileType":
                    req.body.fileType,
            },
        },
        {
            arrayFilters: [
                { "sec._id": req.body.sectionID },
                { "tool._id": req.body.toolID },
                {
                    "item._id": req.body.itemID,
                },
            ],
            upsert: false,
            new: true,
        }
    )
        .then((doc) => {
            res.status(200).json({
                status: true,
                data: doc,
                message: "Tool updated successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                message: error.message,
            })
        );
}

// updated info (OK)
function updateStageInfo(req, res) {
    if (req.file) {
        req.body.image = req.file.path.replace("uploads/", "");
    }

    LevelStage.findOneAndUpdate(
        { _id: req.params.id, "stages.language": req.query.language },
        {
            $set: {
                "stages.$.title": req.body.title,
                "stages.$.description": req.body.description,
                "stages.$.image": req.body.image,
                "stages.$.stageNumber": req.body.stageNumber,
            },
        },
        {
            upsert: false,
            new: true,
        }
    )
        .then((doc) => {
            console.log(doc);
            res.status(200).json({
                status: true,
                message: "Stage info updated successfully",
            });
        })
        .catch((error) =>
            res.status(500).json({ status: true, message: error.message })
        );
}

function getAllStages(req, res) {
    LevelStage.find({})
        .then((docs) => {
            res.status(200).json({
                status: true,
                data: docs,
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: false,
                error: error.message,
            })
        );
}

function removeStage(req, res) {
    LevelStage.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            if (!data) throw new Error("The stage does not exist");
            res.status(200).json({
                status: true,
                message: "Stage deleted successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: false,
                message: error.message,
            });
        });
}

async function createStageSeed(req, res) {
    console.log("seeding stages ...");
    console.log(SeedStagesData.length, SeedStagesData);
    try {
        let remove = await LevelStage.remove({});
        console.log("removed older stages successfully");
        let addNew = await LevelStage.create(SeedStagesData);
        console.log(addNew);
        console.log("Populated stages successfully ..");
        res.status(200).json({
            status: true,
            message: "Older Stages removed and new added Successfully.",
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = router;
