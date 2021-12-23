var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const sectionSchema = new Schema({
    title: String,
    image: String,
    description: String,

    stage: { type: mongoose.Schema.Types.ObjectId, ref: "stagev3" },
    content: {
        type: String,
        default: "N/A",
    },
});
sectionSchema.virtual("tools", {
    ref: "tool",
    localField: "_id",
    foreignField: "sectionId",
    // count: true,
    // match: { voteType: "up" },
});

sectionSchema.set("toObject", { virtuals: true });

sectionSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("section", sectionSchema);
