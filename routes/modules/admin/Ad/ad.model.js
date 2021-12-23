const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    image: {
        type: String
    },
    description: String,
    redirectUrl: String
});

module.exports = mongoose.model('Ad', adSchema);