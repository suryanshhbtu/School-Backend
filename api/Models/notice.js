const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    msg: {type: String},
    by: {type: String},
    newLabel: {type:Boolean, default:false},
});

module.exports = mongoose.model('Notice', noticeSchema);