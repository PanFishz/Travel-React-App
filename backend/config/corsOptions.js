const orginURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5173' :
    'https://www.wanderlist.rinmeyers.com'



const corsOptions = {
    origin: orginURL,
    optionsSuccessStatus: 200,
    credentials: true,

}

module.exports = corsOptions;