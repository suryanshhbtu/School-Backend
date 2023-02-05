const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    age: {type: Number},
    experience: {type: Number},
    speciality: {type: String},
    msg: {type: String},
});

module.exports = mongoose.model('Staff', staffSchema);
