var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ToolItemSchema = new Schema({
    title: String,
    downloadLink: {
        type: String,
        required: [true, "Download Url is required"],
    },
    fileType: String,
    type: String,
    viewAble: { type: Boolean, default: true },
    downloadAble: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
});

const toolSchema = new Schema({
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "section" },
    title: String,
    items: [ToolItemSchema],
});

module.exports = mongoose.model("tool", toolSchema);
