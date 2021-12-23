const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const search = new Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref:'Event'},
    post: {type: mongoose.Schema.Types.ObjectId, ref:'Post'},
    title: String
})

module.exports = mongoose.model('Search', search);