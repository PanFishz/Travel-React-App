const allowedOrigins = require('./allowedOrigins');


const orginURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5173' :
    'https://www.wanderlist.rinmeyers.com'
//'https://alwayswanderlist.onrender.com'


const corsOptions = {
    // origin: (origin, callback) => {
    //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true)
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: orginURL,
    optionsSuccessStatus: 200,
    credentials: true,

}

module.exports = corsOptions;