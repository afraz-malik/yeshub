const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = require('../../../../src/model/user/events/eventSchema').schema;

const draftSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    title: {
        type: String
    },
    event: EventSchema
})

module.exports = mongoose.model('Draft', draftSchema);