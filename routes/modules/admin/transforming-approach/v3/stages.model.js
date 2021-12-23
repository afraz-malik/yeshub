var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const StageSchema = new Schema(
    {
        stageNumber: {
            type: Number,
            require: [true, "Stage number is required"],
        },
        title: { type: String, require: [true, "Stage title is required"] },
        // sections: [SectionSchema],
    },
    {
        id: false,
        versionKey: false,
        timestamps: true,
    }
);

StageSchema.virtual("sections", {
    ref: "section",
    localField: "_id",
    foreignField: "stage",
    // count: true,
    // match: { voteType: "up" },
});

StageSchema.set("toObject", { virtuals: true });

StageSchema.set("toJSON", { virtuals: true });
const Stage = mongoose.model("stagesv3", StageSchema);

module.exports = { Stage: Stage };
