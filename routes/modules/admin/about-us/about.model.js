const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    image : String,
    points: [{content: String}], 
    addedBy:{type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

module.exports = mongoose.model('About', aboutSchema);