const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const schema = new Schema({
    conversationID: {
        type: String,
        required: [true, 'pleas add conversation ID']
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})


module.exports = mongoose.model('ArchivedChat', schema);
