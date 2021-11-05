const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resource = new Schema({
    counter: {type: Number, default: 0}
})

module.exports = mongoose.model('ResourceCounter', resource);