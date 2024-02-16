const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    author: String
})

const DayModel = mongoose.model("Day", DaySchema);
module.exports = DayModel