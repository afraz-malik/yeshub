const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const slideSchema = new Schema({
    image: {
        type: String, required: true
    }
})

module.exports = mongoose.model('Slide', slideSchema);