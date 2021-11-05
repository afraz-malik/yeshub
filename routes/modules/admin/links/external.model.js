const mongoose = require('mongoose');
const Schem = mongoose.Schema;


const linkSchema = new Schem({
    title: {
        type: String, 
        required: [true, "please provide title"]
    },
    link: {
        type: String, 
        required: [true, "please add href link"]
    }
})

module.exports = mongoose.model('ExternalLink', linkSchema);