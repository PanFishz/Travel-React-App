const { tripSchema, destinationSchema, activitySchema, activityTitleSchema, activityLocationSchema, noteSchema } = require('./yupValidationSchema');

module.exports.validateAddATripForm = (req, res, next) => {
    const tripData = req.body;
    tripSchema
        .validate(tripData)
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
    const activityData = req.body;
    activitySchema
        .validate(activityData)
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



