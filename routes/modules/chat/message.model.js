const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String, trim: true
    },

    image: String,

    conversationID: {
        type: String, index: true
    },

    from: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    to: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    seen: {
        type: Boolean, default: false
    },

    community: {
        type: Schema.Types.ObjectId, ref: 'Knowledgegroup'
    }, 
    event: {
        type: Schema.Types.ObjectId, ref: 'Event'
    },
    
    thread : {type: Schema.Types.ObjectId, ref: 'Thread'}
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model('Message', messageSchema);

