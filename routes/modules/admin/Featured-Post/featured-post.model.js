var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var fpSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: false
    },
    redirectUrl: {
        type: String,
        required: [true, "redirectUrl is required"]
    },
    displayImage: {
        thumbnail: String,
        original: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('FeaturedPost', fpSchema);