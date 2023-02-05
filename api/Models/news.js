const mongoose = require('mongoose');
const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String},
    notice:{type:String},
    msg: {type:String},
    newLabel: {type:Boolean},
});
module.exports = mongoose.model('News', newsSchema);