if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    //console.log(process.env.CLOUDINARY_CLOUD_NAME);    //to check
}


const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    //const cookies = req.cookies;
    const { refreshToken } = req.query
    console.log('refresh cookie', refreshToken)

    if (!refreshToken) return res.sendStatus(401);
    // const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    console.log('refresh user', foundUser)
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ roles, accessToken })
        }
    );


    //res.json(cookies)

}

module.exports = { handleRefreshToken }
