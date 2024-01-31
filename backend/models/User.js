const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     // required: true,
    //     unique: true
    // },
    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }]
})

UserSchema.plugin(passportLocalMongoose);


const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel