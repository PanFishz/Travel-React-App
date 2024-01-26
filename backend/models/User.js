const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }]
})

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel