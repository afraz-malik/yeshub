var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SectionSchema = new Schema({
    title: String,
    body: String
})

const ToolSchema = new Schema({
    title: String,
    redirectUrl: {type: String, required: [true, "Url is required"]},
    fileType: String,
    file: {type: String, required:[true, 'file icon is required']}
})

var productSchema = new Schema({  
    language: {
        type: String
    },
    
    logo: {
        type: String, required:[true, 'Logo is required']
    },

    title: {
        type: String, required: [true, 'product title is required']
    },
    shortDescription: {
        type: String, required: [true, 'short description is required']
    },
    videoUrl: {
        type: String
    },
    description: {
        type: String, required: [true, 'description is required']
    },
    animationFile: {
        type: String
    },
    sections: [SectionSchema],
    recommendedTools: [ToolSchema]
})

const sc = new Schema ({
    product: [productSchema]
})

module.exports = mongoose.model('Product', sc);
    