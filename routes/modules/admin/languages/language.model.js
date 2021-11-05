const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const language = new Schema({
    shortCode : {
        type: String,
        required: [true, 'Please provide short code'],
        unique: true
    },
    title: {
        type: String, 
        required: [true, 'Language title is must'],
        unique: true
    },
    display: {type: Boolean, default: true},
    stageDisplay: {type: Boolean, default: true},
})

module.exports = mongoose.model('Language', language);