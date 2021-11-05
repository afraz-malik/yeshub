var mongoose = require("mongoose");
const { Mongos } = require("mongodb");
var Schema = mongoose.Schema;

const SectionSchema = new Schema({
    title: String,
    body: String,
});

const ToolSchema = new Schema({
    title: String,
    redirectUrl: { type: String, required: [true, "Url is required"] },
    fileType: String,
    file: String,
});

const StageSchema = new Schema(
    {
        stageNumber: {
            type: Number,
            require: [true, "Stage number is required"],
        },
        title: { type: String, require: [true, "Stage title is required"] },
        image: { type: String },
        description: {
            type: String,
            require: [true, "Stage description is required"],
        },
        sections: [SectionSchema],
        recommendedTools: [ToolSchema],
        levelId: { type: Schema.Types.ObjectId, ref: "TransformApproach" },
    },
    {
        id: false,
        versionKey: false,
        timestamps: true,
    }
);

var TransformingApproachSchema = new Schema(
    {
        title: { type: String, required: [true, "level title is required"] },
        levelNumber: { type: Number },
    },
    {
        timestamps: true,
        id: false,
    }
);

TransformingApproachSchema.virtual("stages", {
    ref: "LevelStage",
    localField: "_id",
    foreignField: "levelId",
});

TransformingApproachSchema.set("toObject", { virtuals: true });

TransformingApproachSchema.set("toJSON", { virtuals: true });

module.exports = {
    TransformApproach: mongoose.model(
        "TransformApproach",
        TransformingApproachSchema
    ),
    LevelStage: mongoose.model("LevelStage", StageSchema),
};
