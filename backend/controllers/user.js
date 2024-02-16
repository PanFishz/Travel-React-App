const UserModel = require('../models/User');


module.exports.registrationNewUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = new UserModel({ username });
        const registeredUser = await UserModel.register(user, password)
        req.login(registeredUser, err => {
            if (err) {
                console.log(err)
                res.status(301).json("Not signed in")
            };
            res.json(registeredUser)
        })
    } catch (e) {
        console.log(e)
        res.status(409).json('Error: username is already in use');
    }
}


module.exports.loginUser = (req, res) => {
    res.json(req.user)
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json('/')
    })
}

module.exports.getUserName = async (req, res) => {
    const id = req.user?._id;
    if (id) {
        await UserModel.findById(id)
            .then(user => res.json(user))
            .catch(err => res.json(err))
    } else {
        res.status(301).json("Not signed in")
    }

}