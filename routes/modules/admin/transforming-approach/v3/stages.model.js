var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const ToolSchema = new Schema({
    title: String,
    downloadLink: {
        type: String,
        required: [true, "Download Url is required"],
    },
    fileType: String,
});

const SectionSchema = new Schema({
    title: String,
    image: String,
    mainContent: String,
    subContent: String,
    tools: [
        {
            title: String,
            items: [ToolSchema],
        },
    ],
});

const StageSchema = new Schema(
    {
        stageNumber: {
            type: Number,
            require: [true, "Stage number is required"],
        },
        title: { type: String, require: [true, "Stage title is required"] },
        sections: [SectionSchema],
    },
    {
        id: false,
        versionKey: false,
        timestamps: true,
    }
);

// TransformingApproachSchema.set("toObject", { virtuals: true });

// TransformingApproachSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("stagesv2", StageSchema);
