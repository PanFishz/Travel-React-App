// if in development, get environment variables from .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    //console.log(process.env.CLOUDINARY_CLOUD_NAME);    //to check
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const TripModel = require('./models/Trip')
const DayModel = require('./models/Day')
const ActivityModel = require('./models/Activity');
const NoteModel = require('./models/Note');
const tripsRouter = require('./routers/trips.js')
const daysRouter = require('./routers/days.js')
const activitiesRouter = require('./routers/activities.js')
const userRouter = require('./routers/user.js')
const { error } = require('./middlewares')
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
    store, //same as 'store:store,'
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
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




app.use((req, res, next) => {
    //console.log(req.session.returnTo)
    res.locals.currentUser = req.user;
    next();
})


app.use('/trips', tripsRouter);
app.use('/days', daysRouter);
app.use('/activities', activitiesRouter);
app.use('/', userRouter)

app.use(error)
app.listen(3001, () => {
    console.log("Port 3001 is listening")
})
