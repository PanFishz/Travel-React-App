const TripModel = require('../models/Trip')
const DayModel = require('../models/Day')
const ActivityModel = require('../models/Activity');
const NoteModel = require('../models/Note');
const { cloudinary } = require('../cloudinary');
const UserModel = require('../models/User');

module.exports.addATrip = async (req, res, next) => {
    try {
        const { id, trip } = req.body
        const newTrip = new TripModel(trip);
        const numDays = req.body.trip.duration;
        for (let i = 1; i <= numDays; i++) {
            const day = new DayModel({ activities: [], author: id })
            await day.save();
            newTrip.days.push(day);
        }
        const result = await newTrip.save();
        const user = await UserModel.findById(id)
        user.trips.push(newTrip)
        await user.save()
        res.json(newTrip)
    } catch (err) {
        next(err)
    }
}

module.exports.getAllTrips = async (req, res) => {
    const { id } = req.query
    await UserModel.findById(id).populate({ path: 'trips', populate: { path: 'days', populate: { path: 'activities', populate: { path: 'notes' } } } })
        .then(trips => { res.json(trips) })
        .catch(err => res.json(err))

}

module.exports.getOneTrip = async (req, res) => {
    const { id } = req.query;
    await TripModel.findOne({ _id: id }).populate({ path: 'days', populate: { path: 'activities' } })
        .then(trip => res.json(trip))
        .catch(err => res.json(err))
}

module.exports.deleteATrip = async (req, res, next) => {
    try {
        const { id, userId } = req.query;
        const trip = await TripModel.findById(id).populate({ path: 'days', populate: { path: 'activities', populate: { path: 'notes' } } })
        const user = await UserModel.findById(userId)
        user.trips.pull({ _id: id })
        await user.save()
        trip.days.map(async (day) => {
            day.activities.map(async (activity) => {
                activity.notes.map(async (note) => {
                    const deletedNote = await NoteModel.findByIdAndDelete(note._id)
                    if (deletedNote.filename) {
                        await cloudinary.uploader.destroy(deletedNote.filename);
                    }
                })
                await ActivityModel.findByIdAndDelete(activity._id)
            })
            await DayModel.findByIdAndDelete(day._id)
        })
        TripModel.findOneAndDelete({ _id: id })
            .then(id => res.json(id))
            .catch(err => res.json(err))
    } catch (err) {
        next(err)
    }
}

module.exports.addADayToTrip = async (req, res, next) => {
    try {
        const { id, userId } = req.body;
        const trip = await TripModel.findByIdAndUpdate({ _id: id }, { $inc: { duration: 1 } })
        const newDay = new DayModel({ activities: [], author: userId })
        trip.days.push(newDay)
        await newDay.save();
        await trip.save();
        res.json(trip)
    } catch (err) {
        next(err)
    }
}

module.exports.deleteADayFromTrip = async (req, res) => {
    const { tripId, id } = req.query;
    try {
        let trip = await TripModel.findById(tripId)
        if (trip.days.includes(id)) {

            trip.days.pull({ _id: id })

            await trip.updateOne({ $inc: { duration: -1 } })

            const day = await DayModel.findById(id).populate({ path: 'activities', populate: { path: 'notes' } })
            day.activities.map(async (activity) => {
                activity.notes.map(async (note) => {
                    const deletedNote = await NoteModel.findByIdAndDelete(note._id)
                    if (deletedNote.filename) {
                        await cloudinary.uploader.destroy(deletedNote.filename);
                    }

                })
                await ActivityModel.findByIdAndDelete(activity._id)
            })
            await DayModel.findByIdAndDelete(id)

            trip = await trip.populate('days')

            res.json(trip)
        }

    } catch {
        res.status(404).json('error in deleting a day')
    }

}

module.exports.editDestination = async (req, res) => {
    const { id, destination } = req.body;
    await TripModel.findByIdAndUpdate({ _id: id }, { destination })
        .then(trip => {
            res.json({ trip })
        })
        .catch(err => res.json(err))
}

