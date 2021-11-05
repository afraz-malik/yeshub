const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reportedBy:{type: Schema.Types.ObjectId, ref: 'User'},
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    event: {type: Schema.Types.ObjectId, ref: 'Event'},
    comment: {type: Schema.Types.ObjectId, ref: 'Comment'},
    reason: {type: String, trim: true, required: [true, 'please specify reason']},
    actionPerformed: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false,
})

reportSchema.plugin(paginate);

module.exports = mongoose.model('Report', reportSchema);