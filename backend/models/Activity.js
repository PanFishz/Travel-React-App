const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }],
    author: String
})

const ActivityModel = mongoose.model("Activity", ActivitySchema);
module.exports = ActivityModel