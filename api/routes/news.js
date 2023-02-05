const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();     // importing router from express
const News = require('../Models/news');

// Get All News And Event -> returns a json Array of all object present in database
router.get('/', (req, res, next) => {
    News.find().exec().then(doc => {
        console.log("From DATABASE", doc);
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            Error: err,
            msg: "Failed to Fetch All from database."
        });
    });
});

// get Specific News
router.get('/:newsId', (req, res, next) => {
    const id = req.params.newsId;
    News.findById(id).exec().then(doc => {
        console.log("From DATABASE", doc);
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            Error: err,
            msg: "check NewsId and Try Again !"
        });
    });
});
// POSTING NEW NEWS_AND_EVENT
router.post('/', (req, res, next) => {
    const news = new News({
        _id: mongoose.Types.ObjectId(),   // dont write schema here-> bson error
        title: req.body.title,
        notice: req.body.notice,
        msg: req.body.msg,
        newLabel: req.body.newLabel,
    });
    news.save().then(result => {
        console.log(result);
    }).catch(err => {console.log(err);
    res.status(200).json({
        message: "Some Error in News Post",
        Error: err
    });})
});

// DELETING A NEWS
router.delete('/:newsId', (req, res, next) => {
    const id = req.params.newsId;
    News.remove({ _id: id }).exec().then((result) => {
        res.status(200).json({
            message: "News Deleted Successfully",
            result: result
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "News Not Deleted",
            Error: err,
        });
    });
});


// Updating A NEWS
router.patch('/:newsId', (req, res, next) => {
    const _id = req.params.newsId;
    const updatedOps = {};
    for(const ops of req.body){
        updatedOps[ops.propName] = ops.value;
    }
    News.updateOne({ _id: _id }, {$set: updatedOps}
        ).exec().then((result) => {
            console.log(result);
        res.status(200).json({
            message: "News Updated Successfully",
            result: {
                type: "GET",
                url: "http://localhost:3030/news/" + _id,
            },
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Some Error In Patch",
            Error: err,
        });
    });
});
module.exports = router;