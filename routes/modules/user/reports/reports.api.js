const router = require('express').Router();
const Report = require('./reports.model');
const auth = require('../../../../middleware/auth');
const admin = require('../../../../middleware/checkAdmin');

router.route('/').post(auth, create).get(getAll);
router.route('/:ID').put(actionPerform);


function create(req, res) {
    let report = new Report(req.body);
    report.reportedBy = req.user.ID;
    report.save().then(data => {
        res.json({status: true, message: 'Created successfully', data: data});
    })
}

function getAll(req, res) {
    let options = {
        populate: [
            {
                path: 'event', select: 'eventName author', populate: {
                    path: 'author', select: 'userName userImage'
                } 
            },
            {
                path: 'comment', select: 'body createdAt userId', populate: {
                    path: 'userId', select: 'userName userImage'
                } 
            },
            {
                path: 'post', select: 'title author', populate: {
                    path: 'author', select: 'userName userImage'
                } 
            },
            {
                path: 'reportedBy', select: "userName userImage"
            }
        ],
        page: req.query.page > 0 ? req.query.page : 1 || 1
    }

    Report.paginate({}, options)
    .then(reports => {
        res.status(200).json({status: true, message:  `found ${reports.length} reports`, data: reports});
    })
}

function actionPerform(req, res) {
    Report.findOneAndUpdate({_id: req.params.ID}, {actionPerformed: true}, {upsert: false, new: true})
    .then(doc => {
        res.json({status: true, message: 'Action performed on report successfully'});
    })
    .catch(error => res.json({status: false, message: error.message}))
}
module.exports = router;