const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const progressBarSchema = {
    email: {
        type: Boolean,
        required: false,
        default: false,
    },
    updateProfile: {
        type: Boolean,
        required: false,
        default: false,
    },
    joinThreeCommunities: {
        type: Boolean,
        required: false,
        default: false,
    },
    firstPost: {
        type: Boolean,
        required: false,
        default: false,
    },
    tenUpvotes: {
        type: Boolean,
        required: false,
        default: false,
    },
    createBookmarkEvent: {
        type: Boolean,
        required: false,
        default: false,
    },
};

const achievementSchema = {
    firstCaseStudy: {
        type: Boolean,
        required: false,
        default: false,
    },
    contributefiveCaseStudy: {
        type: Boolean,
        required: false,
        default: false,
    },
    contributeTenCaseStudy: {
        type: Boolean,
        required: false,
        default: false,
    },
    contributeTwentyfiveCaseStudy: {
        type: Boolean,
        required: false,
        default: false,
    },
    createTenPost: {
        type: Boolean,
        required: false,
        default: false,
    },
    createTwentyFivePost: {
        type: Boolean,
        required: false,
        default: false,
    },
    createFiftyPost: {
        type: Boolean,
        required: false,
        default: false,
    },
    createHundredPost: {
        type: Boolean,
        required: false,
        default: false,
    },
    createFiveCalendarEntries: {
        type: Boolean,
        required: false,
        default: false,
    },
    createTenCalendarEntries: {
        type: Boolean,
        required: false,
        default: false,
    },
    createTwentyFiveCalendarEntries: {
        type: Boolean,
        required: false,
        default: false,
    },
};

const addressSchema = {
    telephone: {
        type: String,
        required: false,
        trim: true,
        default: "",
    },
    city: {
        type: String,
        required: false,
        trim: true,
        default: "",
    },
    country: {
        type: String,
        required: false,
        trim: true,
        default: "",
    },
};

const metaInfo = {
    organization: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    position: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    departmentTeam: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    supervisorManager: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    homeOffice: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    projectProgram: [
        {
            title: {
                type: String,
                required: false,
                trim: true,
                default: true,
            },
            description: {
                type: String,
                required: false,
                trim: true,
                default: true,
            },
            isPublic: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
    ],
};

const userSchema = new mongoose.Schema(
    {
        isHidden: { type: Boolean, default: false },
        userName: {
            type: String,
            required: false,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        PersonalStatement: {
            type: String,
            required: false,
            trim: true,
            default: null,
        },
        userImage: {
            type: String,
            required: false,
            default: "user/default.png",
        },
        socialNetwork: {
            type: String,
            required: false,
            default: "",
        },
        socialUid: {
            type: String,
            required: false,
            default: "",
        },
        points: {
            type: Number,
            default: 0,
        },
        receivedAward: {
            type: Array,
            required: false,
            default: [],
        },
        awardGiven: {
            type: Array,
            required: false,
            default: [],
        },
        hash: {
            type: String,
            required: false,
            default: null,
        },
        muteNotifications: {
            type: Boolean,
            required: false,
            default: false,
        },
        assignedRoles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Roles",
            },
        ],
        joinedCommunities: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Knowledgegroup",
            },
        ],
        followedTags: [String],
        savedEvents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Event",
            },
        ],
        subscribedEvents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Event",
            },
        ],
        savedPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Post",
            },
        ],
        progressBar: progressBarSchema,
        achievements: achievementSchema,
        metaInfo: metaInfo,
        otherInfo: {
            identifyAs: {
                type: String,
                required: false,
                trim: true,
                default: null,
            },
            disabilityGroup: {
                hearing: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
                seeing: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
                walking: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
                otherMobility: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
                remembering: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
                communication: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
            },
            city: {
                type: String,
                required: false,
                trim: true,
                default: null,
            },
            nationalities: [
                {
                    type: String,
                    required: false,
                    trim: true,
                },
            ],
            birthDetail: {
                month: {
                    type: String,
                    required: false,
                    default: null,
                },
                year: {
                    type: String,
                    required: false,
                    default: null,
                },
            },
        },
    },
    {
        timestamps: true,
        versionKey: false, // You should be aware of the outcome after set to false
    }
);
userSchema.plugin(mongoosePaginate);

userSchema.methods.validUserPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validateUser = function (user) {
    const schema = {
        userName: Joi.string().trim().min(3).max(20).required(),
        socialNetwork: Joi.string().optional(),
        socialUid: Joi.string().optional(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string()
            .min(12)
            .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/))
            .required()
            .error(
                () =>
                    "Password Should be minimum of 12 characters with a combination of uppercase, lowercase, and numerical characters."
            ),
        roleId: Joi.string().min(24).max(24).required(),
    };
    return Joi.validate(user, schema);
};

userSchema.index({ name: "text", userName: "text" });
userSchema.index({ name: "text", email: "text" });

//update validate method
userSchema.methods.validateUpdateUser = function (user) {
    const schema = {
        PersonalStatement: Joi.string().trim().min(3).optional(),
    };
    return Joi.validate(user, schema);
};
//validate more information section
userSchema.methods.validateMoreInfo = (user) => {
    const schema = {
        organization: Joi.string().max(255).optional(),
        position: Joi.string().optional(),
        departmentTeam: Joi.string().optional(),
        supervisorManager: Joi.string().email({ minDomainAtoms: 2 }).optional(),
        homeOffice: Joi.string().optional(),
        project: Joi.array()
            .items(
                Joi.object().keys({
                    title: Joi.string().optional(),
                    description: Joi.string().optional(),
                    isPublic: Joi.boolean().optional(),
                })
            )
            .optional(),
    };

    return Joi.validate(user, schema);
};

//update validate other information method
userSchema.methods.validateUpdateOtherInfo = function (user) {
    const schema = {
        identifyAs: Joi.string().trim().required(),
        disabilityGroup: Joi.object().keys({
            hearing: Joi.boolean().optional(),
            seeing: Joi.boolean().optional(),
            walking: Joi.boolean().optional(),
            otherMobility: Joi.boolean().optional(),
            remembering: Joi.boolean().optional(),
            communication: Joi.boolean().optional(),
        }),
        city: Joi.string().trim().required(),
        nationalities: Joi.array().items(Joi.string().optional()).optional(),
        birthDetail: Joi.object().keys({
            month: Joi.string().optional(),
            year: Joi.string().optional(),
        }),
    };
    return Joi.validate(user, schema);
};
//update password
userSchema.methods.validateChangePassword = function (user) {
    const schema = {
        password: Joi.string().min(1).required(),
        newPassword: Joi.string()
            .min(12)
            .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/))
            .required()
            .error(
                () =>
                    "Password Should be minimum of 12 characters with a combination of uppercase, lowercase, and numerical characters."
            ),
        // newPassword: Joi.string()
        //     .min(12)
        //     .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/))
        //     .required()
        //     .error(
        //         () =>
        //             "Password Should be minimum of 12 characters with a combination of uppercase, lowercase, and numerical characters."
        //     ),
        confirmNewPassword: Joi.string()
            .valid(Joi.ref("newPassword"))
            .error(() => "Passwor and Confirm Password doesnot match."),
    };
    return Joi.validate(user, schema);
};
//update image
userSchema.methods.validateImage = function (user) {
    const schema = {
        image: Joi.required(),
    };
    return Joi.validate(user, schema);
};

//validate forgot Password email address
userSchema.methods.validateForgotEmail = function (user) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    };
    return Joi.validate(user, schema);
};
//validate hash
userSchema.methods.checkHash = function (user) {
    const schema = {
        hash: Joi.string().min(15).max(15).required(),
    };
    return Joi.validate(user, schema);
};
//validate reset
userSchema.methods.reset = function (user) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        hash: Joi.string().min(15).max(15).required(),
        password: Joi.string()
            .min(12)
            .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/))
            .required()
            .error(
                () =>
                    "Password Should be minimum of 12 characters with a combination of uppercase, lowercase, and numerical characters."
            ),
    };
    return Joi.validate(user, schema);
};

userSchema.methods.validateUserRole = function (role) {
    const schema = {
        roleId: Joi.string().min(24).max(24).required(),
    };
    return Joi.validate(role, schema);
};

//generate token
userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            ID: this._id,
            role: this.assignedRoles[0].roleName,
            roleID: this.assignedRoles[0]._id,
        },
        config.get("jwtPrivateKey")
    );
    return token;
};
//compare password
userSchema.methods.comparePassword = function (plain, encrepted) {
    let result;
    result = bcrypt.compareSync(plain, encrepted);
    return result;
};
//login form validate
userSchema.methods.loginFormUser = function (user) {
    const schema = {
        email: Joi.string().optional(),
        password: Joi.string()
            .required()
            .error(() => {
                return { message: "please provide password" };
            }),
    };
    return Joi.validate(user, schema);
};

//validateActivate
userSchema.methods.validateActivate = function (forgot) {
    const schema = {
        hash: Joi.string().required(),
        email: Joi.string().email().required(),
    };

    return Joi.validate(forgot, schema);
};
//validate again Activate email request
userSchema.methods.validateActivateAgain = function (forgot) {
    const schema = {
        email: Joi.string().email().required(),
    };

    return Joi.validate(forgot, schema);
};

//validate again Activate email request
userSchema.methods.validatechangeUserName = function (username) {
    const schema = {
        username: Joi.string().required(),
    };

    return Joi.validate(username, schema);
};

module.exports = mongoose.model("User", userSchema);
