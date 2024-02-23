const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }]
})

UserSchema.plugin(passportLocalMongoose);


const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel
