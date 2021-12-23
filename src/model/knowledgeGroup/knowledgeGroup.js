const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");
const DEFAULT_JOINING_TYPE = 1;
const LikeDislike = {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
};
const rulesSchema = {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        default: "",
    },
};
const knowledgeGroup = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
            default: "",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        logo: {
            type: String,
            required: false,
            default: "knowledge/logo_default.png",
        },
        coverImage: {
            type: String,
            required: false,
            default: "knowledge/cover_default.png",
        },
        joingType: {
            type: Number,
            required: true,
            default: DEFAULT_JOINING_TYPE,
        },
        pendingJoining: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
        ],
        rules: [
            {
                type: String,
                required: true,
                trim: true,
            },
        ],
        likes: [LikeDislike],
        disliskes: [LikeDislike],
        invitesModerator: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
        ],
        moderators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        published: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
        isArchived: {
            type: Boolean, default: false
        }, 
        pendingPosts: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        }],
        pendingEvents: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Event'
        }],
        autoPE: {
            type: Boolean, default: true 
        },
        totalMembers : {
            type: Number, default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
knowledgeGroup.index({name: 'text', 'name': 'text'});

knowledgeGroup.plugin(mongoosePaginate);

knowledgeGroup.methods.validateKnowledgeGroup = function (knowledge) {
    const schema = {
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        slug: Joi.string().required(),
        logo: Joi.string().optional(),
        joingType: Joi.number().optional(),
        rules: Joi.array().items(Joi.string().required()).optional(),
        autoPE: Joi.bool().optional()
    };
    return Joi.validate(knowledge, schema);
};
knowledgeGroup.methods.validateUpdateKnowledgeGroup = function (knowledge) {
    const schema = {
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        slug: Joi.string().required(),
        joingType: Joi.number().optional(),
        rules: Joi.array().items(Joi.string().required()).optional(),
        autoPE: Joi.bool().optional()
    };
    return Joi.validate(knowledge, schema);
};

knowledgeGroup.methods.validateImage = function (image) {
    const schema = {
        logo: Joi.required(),
    };
    return Joi.validate(image, schema);
};
knowledgeGroup.methods.sendInvite = function (invite) {
    console.log(invite);
    const schema = {
        ID: Joi.required(),
        userID: Joi.required(),
    };
    return Joi.validate(invite, schema);
};
knowledgeGroup.methods.acceptInvite = function (invite) {
    const schema = {
        ID: Joi.required(),
    };
    return Joi.validate(invite, schema);
};
module.exports = mongoose.model("Knowledgegroup", knowledgeGroup);
