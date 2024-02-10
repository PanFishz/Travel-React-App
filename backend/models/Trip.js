const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    days: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Day'
    }]
})


const TripModel = mongoose.model("Trip", TripSchema);
module.exports = TripModel