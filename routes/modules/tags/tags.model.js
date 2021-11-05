const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        unique: [true, "This tag already exist"],
        required: [true, "please add some words"],
        trim: true,
    },
});

module.exports = mongoose.model("Tag", tagSchema);
