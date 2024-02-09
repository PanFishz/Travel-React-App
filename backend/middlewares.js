const DayModel = require('./models/Day')
const UserModel = require('./models/User');
const ActivityModel = require('./models/Activity')
const NoteModel = require('./models/Note')
const { tripSchema, destinationSchema, activitySchema, activityTitleSchema, activityLocationSchema, noteSchema } = require('./yupValidationSchema');

module.exports.validateAddATripForm = (req, res, next) => {
    const { trip } = req.body;
    console.log(req.body)
    tripSchema
        .validate(trip)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors);
        })
        .then(valid => {
            if (valid) {
                console.log("form is good");
                next()
            }
        });
};


module.exports.validateDestination = (req, res, next) => {
    const destinationData = req.body;
    destinationSchema
        .validate(destinationData)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors);
        })
        .then(valid => {
            if (valid) {
                console.log("destination is good");
                next()
            }
        });
};

module.exports.validateActivity = (req, res, next) => {
    const { activity } = req.body;
    activitySchema
        .validate(activity)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors);
        })
        .then(valid => {
            if (valid) {
                console.log("activity is good");
                next()
            }
        });
}

module.exports.validateActivityTitle = (req, res, next) => {
    const activityData = req.body;
    activityTitleSchema
        .validate(activityData)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors);
        })
        .then(valid => {
            if (valid) {
                console.log("activity title is good");
                next()
            }
        });
}

module.exports.validateActivityLocation = (req, res, next) => {
    const locationData = req.body;
    activityLocationSchema
        .validate(locationData)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors);
        })
        .then(valid => {
            if (valid) {
                console.log("activity location is good");
                next()
            }
        });
}

module.exports.validateNote = (req, res, next) => {
    const { note } = req.body;
    noteSchema
        .validate(note)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors);
        })
        .then(valid => {
            if (valid) {
                console.log("note is good");
                next()
            }
        });
}

module.exports.isLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json('Not Logged In/ Unauthorized')
    }
    next();

}

module.exports.isTripAuthor = async (req, res, next) => {
    let id = ""
    if (req.query.id) {
        id = req.query.id;
    } else {
        id = req.body.id;
    }
    const user = await UserModel.findById(req.user._id);
    if (!user.trips.includes(id)) {
        return res.status(401).json('Not Logged In/ Unauthorized')
    }
    next();
}


module.exports.isUser = (req, res, next) => {
    const { id } = req.query
    if (id !== (req.user._id).toString()) {
        return res.status(401).json('Not Logged In/ Unauthorized')
    }
    next();
}

module.exports.isDayAuthor = async (req, res, next) => {
    let id = ""
    if (req.query.id) {
        id = req.query.id;
    } else {
        id = req.body.id;
    }
    const day = await DayModel.findById(id);
    if (day.author !== (req.user._id).toString()) {
        return res.status(401).json('Not Logged In/ Unauthorized')
    }
    next();
}

module.exports.isActivityAuthor = async (req, res, next) => {
    let id = ""
    if (req.query.id) {
        id = req.query.id;
    } else {
        id = req.body.id;
    }
    const activity = await ActivityModel.findById(id);
    if (activity.author !== (req.user._id).toString()) {
        return res.status(401).json('Not Logged In/ Unauthorized')
    }
    next();
}

module.exports.isNoteAuthor = async (req, res, next) => {
    let id = ""
    if (req.query.noteId) {
        id = req.query.noteId;
    } else {
        id = req.body.noteId;
    }
    const note = await NoteModel.findById(id);
    if (note.author !== (req.user._id).toString()) {
        return res.status(401).json('Not Logged In/ Unauthorized')
    }
    next();
}

module.exports.error = (err, req, res, next) => {
    const statusCode = err.status || 500;
    if (!err.message) err.message = "Something went wrong"
    res.status(statusCode).json("Something went wrong")
}

