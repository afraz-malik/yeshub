const mongoose = require("mongoose");
const Joi = require("joi");


const awardSchema = new mongoose.Schema({
  awardName: {
    type: String,
    required: true,
  },
  awardDescription: {
    type: String,
    required: false,
  },
  cost: {
    type: Number,
    required: true,
  },
  images: [{ 
    type: String,
    required: true,
    default: null
    }]
});


awardSchema.methods.validateAward = function (award) {
    const schema = {
        awardName: Joi.string().trim().required(),
        awardDescription: Joi.string().trim().max(20).optional(),
        cost: Joi.number().required(),
        images: Joi.array().required(),
    };
    return Joi.validate(award, schema);
};

module.exports = mongoose.model("Award", awardSchema);
