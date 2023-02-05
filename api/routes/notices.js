const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();     // importing router from express
const Notice = require('../Models/notice');

// Get All Notice And Event -> returns a json Array of all object present in database
router.get('/', (req, res, next) => {
    Notice.find().exec().then(doc => {
        console.log("From DATABASE", doc);
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            Error: err,
            msg: "Failed to Fetch All Notice from database."
        });
    });
});

// get Specific Notice
router.get('/:noticeId', (req, res, next) => {
    const id = req.params.noticeId;
    Notice.findById(id).exec().then(doc => {
        console.log("From DATABASE", doc);
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            Error: err,
            msg: "check noticeId and Try Again !"
        });
    });
});
// POSTING NEW Notice_AND_EVENT
router.post('/', (req, res, next) => {
    const notice = new Notice({
        _id: mongoose.Types.ObjectId(),   // dont write schema here-> bson error
        title: req.body.title,
        msg: req.body.msg,
        by: req.body.by,
        newLabel: req.body.newLabel,
    });
    notice.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: " POST Notice data Successfully",
            result: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed to POST Notice data",
            Error: err
        });
    });
});

// DELETING A Notice
router.delete('/:noticeId', (req, res, next) => {
    const id = req.params.noticeId;
    Notice.remove({ _id: id }).exec().then((result) => {
        res.status(200).json({
            message: "Notice Member Deleted Successfully",
            result: result
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Notice Not Deleted",
            Error: err,
        });
    });
});


// Updating A Notice
router.patch('/:noticeId', (req, res, next) => {
    const _id = req.params.noticeId;
    const updatedOps = {};
    for (const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }
    Notice.updateOne({ _id: _id }, { $set: updatedOps }
    ).exec().then((result) => {
        console.log(result);
        res.status(200).json({
            message: "Notice Updated Successfully",
            result: {
                type: "GET",
                url: "http://localhost:3030/Notices/" + _id,
            },
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Some Error In Patch Notice",
            Error: err,
        });
    });
});
module.exports = router;