const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    author: String
})

const DayModel = mongoose.model("Day", DaySchema);
module.exports = DayModel