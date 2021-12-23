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

const { Stage } = require("./stages.model");
const Section = require("./section.model");
const Tool = require("./tool.model");
const auth = require("../../../../../middleware/auth");
const admin = require("../../../../../middleware/checkAdmin");

// router.route('/').post([auth, admin], upload.single('image'), createLevel);
router.route("/").get(getAll);
router.route("/").post(createStage);
router.route("/update/stage").post(updateStage);
router.route("/update/section").post(updateSection);
router.route("/:id").get(getById);
router
    .route("/:id")
    .put([auth, admin], upload.single("image"), updateStageInfo);
// router.route('/:id').delete([auth, admin], removeLevel);
router.route("/:id").delete([auth, admin], removeStage);
router.route("/add/tool").post(/*[auth, admin],*/ addToolToSection);
router.route("/add/toolitem").post(/*[auth, admin],*/ addToolItemToTool);
router.route("/add/section").post(/*[auth, admin], */ createSection);
// router.route("/update/section").put(/*[auth, admin], */ updatSectionInStage);
router
    .route("/update/tool")
    .put(/*[auth, admin], upload.single("file"),*/ updatToolInStage);
router.route("/update/toolitem/viewable").post(updateViewable);
router.route("/update/toolitem/downloadable").post(updateDownloadable);
router
    .route("/update/toolitem")
    .put(/*[auth, admin], upload.single("file"),*/ updateToolItem);
router
    .route("/remove/toolitem/:stageID/:sID/:tID/:ID")
    .delete(/*[auth, admin], upload.single("file"),*/ removeToolItem);
router.route("/remove/section").put([auth, admin], removeSectionfromStage);
router.route("/remove/tool").put([auth, admin], removeToolFromStage);
router.route("/create/seed").get(seedStage);

function createStage(req, res) {
    const { title, stageNumber } = req.body;
    Stage.create({ title, stageNumber })
        .then((doc) => {
            res.json({ message: "Stage Created Successfully" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

function createSection(req, res) {
    const { stageID, title, image, content, description } = req.body;
    const section = new Section({
        stage: stageID,
        title,
        image,
        content,
        description,
    });
    section
        .save()
        .then((doc) => {
            res.json({ message: "Saved section successfully", data: doc });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

function updateStage(req, res) {
    const { stageID } = req.body;
    Stage.findOneAndUpdate({ _id: stageID }, req.body, {
        upsert: false,
        new: true,
    })
        .then((doc) => {
            res.json({ message: "section updated successfully", data: doc });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}
function updateSection(req, res) {
    const { stageID, sectionID, title, image, content, description } = req.body;

    console.log("------------- update section ------------------");
    console.log(req.body);
    console.log("------------- update section ------------------");
    Section.update({ _id: sectionID }, req.body, {
        upsert: false,
        new: true,
    })
        .then((doc) => {
            res.json({ message: "section updated successfully", data: doc });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

function getAll(req, res) {
    // let language = req.query.language || "eng";
    Stage.find({})
        .populate([
            {
                path: "sections",
                populate: {
                    path: "tools",
                },
            },
        ])
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

// Done
function createStage(req, res) {
    console.log("--- reqbody ---");
    console.log(req.body);
    console.log("--- reqbody ---");
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
 */ //done
function addSectionToStage(req, res) {
    console.log("==== data ======");
    console.log(req.body);
    console.log("==== data ======");
    const { title, image, description, mainContent, content } = req.body;
    let section = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        image,
        content,
        // mainContent,
        // subContent,
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
function addToolToSection(req, res) {
    const { title, items, sectionID } = req.body;
    let tool = new Tool({
        sectionId: sectionID,
        title,
        items,
    });

    tool.save()
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

function addToolItemToTool(req, res) {
    const { toolId, title, downloadLink, fileType, viewAble, downloadAble } =
        req.body;
    let toolItem = { title, downloadLink, fileType, viewAble, downloadAble };
    Tool.findOneAndUpdate(
        { _id: toolId },
        { $push: { items: toolItem } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            res.json({ message: "added tool successfully", data: doc });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
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

function updateViewable(req, res) {
    Tool.update(
        { _id: req.body.toolID, "items._id": req.body.itemID },
        { $set: { "items.$.viewAble": req.body.viewAble } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            res.json({ data: doc, message: "updated successfully" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}
function updateDownloadable(req, res) {
    Tool.update(
        { _id: req.body.toolID, "items._id": req.body.itemID },
        { $set: { "items.$.downloadAble": req.body.downloadAble } },
        { upsert: false, new: true }
    )
        .then((doc) => {
            res.json({ data: doc, message: "updated successfully" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
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

async function seedStage() {
    try {
        const allDummyStages = require("./stage-seed.data");
        let stages = [];
        let sections = [];
        let tools = [];
        allDummyStages.forEach((itm) => {
            let ID = new mongoose.Types.ObjectId();
            console.log(ID);
            stages.push({ ...itm, _id: ID });
            itm.sections.forEach((section) => {
                let sectionID = new mongoose.Types.ObjectId();
                let _section = {
                    _id: sectionID,
                    stage: ID,
                    ...section,
                };
                let html = section.content.mainContent + "<br><br>";
                section.content.subContents.forEach((con) => {
                    html += toContentHtml(con);
                });
                _section.content = html;
                sections.push({ ..._section });

                section.tools.forEach((tool) => {
                    let items = [];
                    tool.tools.forEach((toolItem) => {
                        items.push({
                            title: toolItem.original,
                            downloadLink: toolItem.link,
                        });
                    });
                    tools.push({
                        sectionId: sectionID,
                        title: tool.shortTitle,
                        items: items,
                    });
                });
            });
        });
        console.log(stages.length);
        await Stage.remove({});
        await Section.remove({});
        await Tool.remove({});

        let stageCreated = await Stage.create(stages);
        let sectionsCreated = await Section.create(sections);
        let toolsCreated = await Tool.create(tools);
        console.log(stageCreated.length, "stages created ...");
        console.log(sectionsCreated.length, " sections created ...");
        console.log(toolsCreated.length, " tools created ...");
        res.json({ message: "seeded" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// seedStage();

function toContentHtml(content) {
    return `
    <table>
    <tr>
      <td style="padding: .4em 3em;  vertical-align: middle;">
      <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M26.9915 11.212L14.8 23.4035L8.1585 16.7805L5.55 19.389L14.8 28.639L29.6 13.839L26.9915 11.212ZM18.5 0.889038C8.288 0.889038 0 9.17704 0 19.389C0 29.601 8.288 37.889 18.5 37.889C28.712 37.889 37 29.601 37 19.389C37 9.17704 28.712 0.889038 18.5 0.889038ZM18.5 34.189C10.323 34.189 3.7 27.566 3.7 19.389C3.7 11.212 10.323 4.58904 18.5 4.58904C26.677 4.58904 33.3 11.212 33.3 19.389C33.3 27.566 26.677 34.189 18.5 34.189Z" fill="#243C4B"></path></svg>
      </td>
      <td style="padding: .4em 3em;">
        ${content}
      </td>
    </tr>
  </table>
    `;
}
module.exports = router;
