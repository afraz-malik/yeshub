const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Roles', roleSchema);
