const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();     // importing router from express
const Staff = require('../Models/staff');

// Get All Staff And Event -> returns a json Array of all object present in database
router.get('/', (req, res, next) => {
    Staff.find().exec().then(doc => {
        console.log("From DATABASE", doc);
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            Error: err,
            msg: "Failed to Fetch All Staff from database."
        });
    });
});

// get Specific Staff
router.get('/:staffId', (req, res, next) => {
    const id = req.params.staffId;
    Staff.findById(id).exec().then(doc => {
        console.log("From DATABASE", doc);
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            Error: err,
            msg: "check staffId and Try Again !"
        });
    });
});
// POSTING NEW Staff_AND_EVENT
router.post('/', (req, res, next) => {
    const staff = new Staff({
        _id: mongoose.Types.ObjectId(),   // dont write schema here-> bson error
        name: req.body.name,
        age: req.body.age,
        experience: req.body.experience,
        speciality: req.body.speciality,
        msg: req.body.msg,
    });
    staff.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: " POST Staff data Successfully",
            result: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed to POST Staff data",
            Error: err
        });
    });
});

// DELETING A Staff
router.delete('/:staffId', (req, res, next) => {
    const id = req.params.staffId;
    Staff.remove({ _id: id }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Staff Not Deleted",
            Error: err,
        });
    });
});


// Updating A Staff
router.patch('/:staffID', (req, res, next) => {
    const _id = req.params.staffID;
    const updatedOps = {};
    for (const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }
    Staff.updateOne({ _id: _id }, { $set: updatedOps }
    ).exec().then((result) => {
        console.log(result);
        res.status(200).json({
            message: "Staff Updated Successfully",
            result: {
                type: "GET",
                url: "http://localhost:3030/staffs/" + _id,
            },
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Some Error In Patch Staff",
            Error: err,
        });
    });
});
module.exports = router;