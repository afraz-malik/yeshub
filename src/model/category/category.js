const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
    },
    categoryDescription: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    slug: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: "category/default.png"
    },

}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

categorySchema.methods.validateCategory = function (category) {
    const schema = {
        categoryName: Joi.string().trim().required(),
        categoryDescription: Joi.string().trim().required(),
        slug: Joi.string().required(),
        // slug:Joi.string().pattern(new RegExp('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')).required(),
        image: Joi.required()
    }
    return Joi.validate(category, schema);
};
categorySchema.methods.updateValidateCategory = function (category) {
    const schema = {
        categoryName: Joi.string().trim().required(),
        categoryDescription: Joi.string().trim().required(),
        slug: Joi.string().trim().required(),
    }
    return Joi.validate(category, schema);
};

categorySchema.methods.validateImage = function (image) {
    const schema = {
        image: Joi.required()
    }
    return Joi.validate(image, schema);
};

module.exports = mongoose.model('Category', categorySchema);
