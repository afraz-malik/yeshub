var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
const multer = require('multer');
const SeedStagesData = require('../../../../src/seeder/stageSeeder').SeedStagesData;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirs = process.cwd() + '/uploads/levels';
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs);
        }
        cb(null, './uploads/levels');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);

    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const TransformApproach = require('./transforming-aprroach.model').TransformApproach;
const LevelStage = require('./transforming-aprroach.model').LevelStage;

const auth = require('../../../../middleware/auth');
const admin = require('../../../../middleware/checkAdmin');
const { func } = require('joi');

// router.route('/').post([auth, admin], upload.single('image'), createLevel);
router.route('/').get(getAll);
router.route('/').post([auth, admin], upload.single('image'), createStage);
router.route('/:id').get(getById);
router.route('/:id').put([auth, admin], upload.single('image'), updateStageInfo);
// router.route('/:id').delete([auth, admin], removeLevel);
router.route('/:id').delete([auth, admin], removeStage);

router.route('/add/tool').post([auth, admin], addToolToLevelStage);
router.route('/add/section').post([auth, admin], addSectionToStage);


router.route('/update/section').put([auth, admin], updatSectionInStage);
router.route('/update/tool').put([auth, admin], upload.single('file'), updatToolInStage);
router.route('/remove/section').put([auth, admin], removeSectionfromStage);
router.route('/remove/tool').put([auth, admin], removeToolFromStage);
router.route('/create/seed').get([auth, admin], createStageSeed);

function createLevel(req, res) {
    let ta = new TransformApproach(req.body);
    ta.save()
        .then(ta => {
            res.status(200).json({ status: true, message: 'Level Created successfully' });
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function getAll(req, res) {
    LevelStage.find({}).then(docs => {
        res.status(200).json({
            status: true, data: docs
        })
    })
        .catch(error => res.status(500).json({
            status: false, error: error.message
        }))
}

function getById(req, res) {
    LevelStage.findOne({ _id: req.params.id }).then(stage => {
        if (!stage) {
            throw new Error('Required Stage does not exist');
        }
        res.status(200).json({ status: true, data: stage, message: 'found data' })
    })
        .catch(error => res.status(500).json({
            status: false, message: error.message
        }))
}

function createStage(req, res) {
    try {
        let stage = new LevelStage({
            title: req.body.title,
            stageNumber: req.body.stageNumber,
            description: req.body.description,
            sections: req.body.sections
            // levelId: req.body.levelId
        })

        if (req.file) {
            stage.image = req.file.path.replace("uploads/", "")
        } else {
            throw new Error("image is required");
        }

        stage.save()
            .then(stage => res.status(200).json({ status: true, data: stage, message: 'stage added successfully' }))
            .catch(error => res.status(500).json({ status: false, message: error.message }))

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

function removeLevel(req, res) {
    TransformApproach.findOneAndDelete({ _id: req.params.id }).then(doc => {
        console.log(doc);
        res.status(200).json({
            status: true, message: 'Level deleted successfully'
        })
    })
        .catch(error => res.status(500).json({
            status: false, message: error.message
        }))
}

/**
 * 
 * @description {add section to stage}
 * @param {stageId, title, body} req 
 * @param {*} res 
 */
function addSectionToStage(req, res) {
    let section = {
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        body: req.body.body
    }
    LevelStage.findOneAndUpdate({ _id: req.body.stageId }, { $push: { sections: section } }, { upsert: false })
        .then(product => {
            res.status(201).json({ status: true, data: section, message: 'section added successfully' });
        })
        .catch(error => res.status(500).json({ status: false, message: error.error }));
}


// added data in response
/**
 * 
 * @param {title, body, fileType, image} req 
 * @param {*} res 
 */
function addToolToLevelStage(req, res) {
    let tool = {
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        redirectUrl: req.body.redirectUrl,
        fileType:req.body.fileType,
    }

    switch (req.body.fileType) {
        case 'video':
            tool.file = "icons/video.png";
            break;
        case 'pdf':
            tool.file = "icons/pdf.png";
            break;
        case 'link':
            tool.file = "icons/link.png";
            break;
    }

    LevelStage.findOneAndUpdate({ _id: req.body.stageId }, { $push: { recommendedTools: tool } }, { upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, data: tool, message: 'Added Tool successfully'
            })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }));
}

/**
 * 
 * @param {stgId, sid} req 
 * @param {*} res 
 */
function removeSectionfromStage(req, res) {
    LevelStage.findOneAndUpdate({ _id: req.query.stgId }, { $pull: { sections: { _id: req.query.sid } } }, { upsert: false })
        .then(prod => {
            console.log(prod);
            res.status(200).json({
                status: true, message: 'Section removed successfully'
            })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

/**
 * 
 * @param {stgId, tid} req 
 * @param {*} res 
 */
function removeToolFromStage(req, res) {
    LevelStage.findOneAndUpdate({ _id: req.query.stgId }, { $pull: { recommendedTools: { _id: req.query.tid } } }, { upsert: false })
        .then(prod => {
            res.status(200).json({
                status: true, message: 'Tool removed successfully'
            })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}
// 
function updatSectionInStage(req, res) {

    let query = {
        'sections.$.title': req.body.title,
        'sections.$.body': req.body.body
    };

    if (!req.body.title) {
        delete query['sections.$.title']
    }

    if (!req.body.body) {
        delete query['sections.$.body']
    }

    LevelStage.updateOne({ _id: req.query.stgId, 'sections._id': req.query.sid }, { $set: query }, { upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, data: {_id: req.query.sid, title: req.body.title, body: req.body.body}, message: 'Successfully updated section'
            })
        })
        .catch(error => res.status(500).json({
            status: false,
            message: error.message
        }))
}

// added data in response 
function updatToolInStage(req, res) {
    let icon;
    if(req.body.fileType) {
        icon = 'icons/'+req.body.fileType+'.png';
    }

    let query = {
        'recommendedTools.$.title': req.body.title,
        'recommendedTools.$.redirectUrl': req.body.redirectUrl,
        'recommendedTools.$.fileType': req.body.fileType,
        'recommendedTools.$.file': icon,
    };

    if (!req.body.title) {
        delete query['recommendedTools.$.title']
    }
    if (!req.body.redirectUrl) {
        delete query['recommendedTools.$.redirectUrl']
    }
    if (!req.body.fileType) {
        delete query['recommendedTools.$.fileType']
    }
    if (req.file) {
        query['recommendedTools.$.file'] = req.file.path.replace("uploads/", "")
    } else {
        delete query['recommendedTools.$.file'];
    }

    LevelStage.updateOne({ _id: req.query.stgId, 'recommendedTools._id': req.query.tid }, { $set: query }, { upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, 
                data: {
                    _id: req.query.tid,
                    title: req.body.title,
                    redirectUrl: req.body.redirectUrl,
                    fileType:req.body.fileType,
                    file: icon
                },
                message: 'Successfully updated section'
            })
        })
        .catch(error => res.status(500).json({
            status: false,
            message: error.message
        }))
}


// updated info (OK)
function updateStageInfo(req, res) {

    if (req.file) {
        req.body.image = req.file.path.replace("uploads/", "");
    }

    LevelStage.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false, new: true })
        .then(doc => {
            console.log(doc);
            res.status(200).json({ status: true, data: doc, message: 'Stage info updated successfully' });
        })
        .catch(error => res.status(500).json({ status: true, message: error.message }))
}

function getAllStages(req, res) {
    LevelStage.find({}).then(docs => {
        res.status(200).json({
            status: true, data: docs
        })
    })
        .catch(error => res.status(500).json({
            status: false, error: error.message
        }))
}

function removeStage(req, res) {
    LevelStage.findOneAndDelete({ _id: req.params.id }).then(data => {
        if (!data) throw new Error("The stage does not exist");
        res.status(200).json({
            status: true, message: "Stage deleted successfully"
        })
    })
        .catch(error => {
            res.status(500).json({
                status: false,
                message: error.message
            })
        })
}

async function createStageSeed(req, res) {
    
    try {
        let remove = await LevelStage.remove({});
        console.log('removed older stages successfully');
        let addNew = await LevelStage.create(SeedStagesData);
        console.log('Populated stages successfully ..');
        res.status(200).json({
            status: true,
            message: 'Older Stages removed and new added Successfully.'
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = router;