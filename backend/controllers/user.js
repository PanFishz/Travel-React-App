const UserModel = require('../models/User');


module.exports.registrationNewUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = new UserModel({ username });
        const registeredUser = await UserModel.register(user, password)
        console.log(registeredUser)


        // .then(trip => res.json(trip))
        // .catch(err => res.json(err));
        req.login(registeredUser, err => {
            if (err) {
                console.log(err)
                return next(err);
            };
            console.log("hiii")
            res.json(registeredUser)
        })
    } catch (e) {
        console.log(e)
        res.send('error Either username or email is already in use');
    }
}


module.exports.loginUser = (req, res) => {
    res.send(req.user)
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.log("ppp")
            return next(err);
        }
        res.send('/')
    })
}

module.exports.getUserName = async (req, res) => {
    const { id } = req.query;
    await UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}