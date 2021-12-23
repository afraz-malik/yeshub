const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannedEmails = new Schema({
    email: {type: String, required: true}
})

module.exports = mongoose.model('BannedEmail', bannedEmails);