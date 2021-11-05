const mongoose = require('mongoose');
const Schem = mongoose.Schema;


const bannerSchema = new Schem({
    
    content: {
        type: String, 
        required: [true, "please add content"]
    }
})

module.exports = mongoose.model('Banner', bannerSchema);