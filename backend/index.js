// if in development, get environment variables from .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    //console.log(process.env.CLOUDINARY_CLOUD_NAME);    //to check
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const tripsRouter = require('./routers/trips.js')
const daysRouter = require('./routers/days.js')
const activitiesRouter = require('./routers/activities.js')
const userRouter = require('./routers/user.js')
const { error, errorLogger, errorResponder, failSafeHandler } = require('./middlewares')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
//seesion cookie
const session = require('express-session');
//MongoDB session store for Connect and Express written in Typescript.
const MongoStore = require('connect-mongo');
//password auth setup
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');

const UserModel = require('./models/User')

const multer = require('multer')

const app = express();
app.use(credentials);
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//wont allow '?' and '.' in query/params/body/header key, (reseversed chars by MongoDB as operators)
//replace '?' and '.' by '_'
app.use(
    mongoSanitize({
        replaceWith: '_',
    }),
);
// secure Express apps by setting HTTP response headers.
app.use(helmet());
const scriptSrcUrls = [
];
const styleSrcUrls = [
];
const connectSrcUrls = [
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/droagjbtj/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

//middleware for cookies
//app.use(cookieParser());

// mongo atlas dbbase, if not provided, use local
const mongoURI = process.env.DB_URL || "mongodb://127.0.0.1:27017/travel"
//for development from not-whitelisted Api, use local 
//const dbUrl = 'mongodb://localhost:27017/Gearedmind'

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI)
        console.log('Mongo connected!!')
        // const trip = await TripModel.findOne({ destination: 'NY' })
        // console.log(trip)
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}

connectToMongo();
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = MongoStore.create({
    mongoUrl: mongoURI,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
});

store.on('error', function (e) {
    console.log("session store error", e)
})

const sessionConfig = {
    //avoid using default name "coonect.sid" to add another layer of secirity
    name: 'session',
    store, //same as 'store:store,'
    secret,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
        httpOnly: true,
        //use in https
        secure: process.env.NODE_ENV !== 'production' ? false : true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.NODE_ENV !== 'production' ? 'lax' : 'none'
        //sameSite: 'lax'
    }
}
//flash() must precede routes, bc flash() gives req.flash() function
app.use(session(sessionConfig))
//Middlewares orders is important. Put the .use(passport...) before the .use(router...)
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(UserModel.authenticate()));

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());




// app.use((req, res, next) => {
//     //console.log(req.session.returnTo)
//     //console.log(req.query, req.body)
//     res.locals.currentUser = req.user;
//     next();
// })


app.use('/trips', tripsRouter);
app.use('/days', daysRouter);
app.use('/activities', activitiesRouter);
app.use('/', userRouter)

// app.use(error)

app.use(errorLogger)
app.use(errorResponder)
app.use(failSafeHandler)

//define port and listen to it
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}..`)
})