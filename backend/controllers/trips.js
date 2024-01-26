const TripModel = require('../models/Trip')
const DayModel = require('../models/Day')
const ActivityModel = require('../models/Activity');
const NoteModel = require('../models/Note');
const { cloudinary } = require('../cloudinary')

module.exports.addATrip = async (req, res) => {
    const newTrip = new TripModel(req.body);
    const numDays = req.body.duration;
    for (let i = 1; i <= numDays; i++) {
        const day = new DayModel({ day: i, activities: [] })
        await day.save();
        newTrip.days.push(day);
    }
    const result = newTrip.save();
    res.json(newTrip)
}

module.exports.getAllTrips = async (req, res) => {
    await TripModel.find()
        .then(trips => res.json(trips))
        .catch(err => res.json(err))
}

module.exports.getOneTrip = async (req, res) => {
    const { id } = req.query;
    await TripModel.findOne({ _id: id }).populate({ path: 'days', populate: { path: 'activities' } })
        .then(trip => res.json(trip))
        .catch(err => res.json(err))
}

module.exports.deleteATrip = async (req, res) => {
    const { id } = req.query;
    const trip = await TripModel.findById(id).populate({ path: 'days', populate: { path: 'activities', populate: { path: 'notes' } } })
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
}

module.exports.addADayToTrip = async (req, res) => {
    const { id } = req.body;
    const trip = await TripModel.findByIdAndUpdate({ _id: id }, { $inc: { duration: 1 } })
    const newDay = new DayModel({ day: trip.duration + 1, activities: [] })
    trip.days.push(newDay)
    await newDay.save();
    await trip.save();
    res.json(trip)
}

module.exports.deleteADayFromTrip = async (req, res) => {
    const { tripId, dayId } = req.query;
    let trip = await TripModel.findByIdAndUpdate({ _id: tripId }, { $inc: { duration: -1 } })
    await trip.days.pull({ _id: dayId })
    const day = await DayModel.findById(dayId).populate({ path: 'activities', populate: { path: 'notes' } })
    day.activities.map(async (activity) => {
        activity.notes.map(async (note) => {
            const deletedNote = await NoteModel.findByIdAndDelete(note._id)
            if (deletedNote.filename) {
                await cloudinary.uploader.destroy(deletedNote.filename);
            }

        })
        await ActivityModel.findByIdAndDelete(activity._id)
    })
    await DayModel.findByIdAndDelete(dayId)
    await trip.save()
    trip = await trip.populate('days')
    let dayindex = 0
    trip.days.map(async (day) => {

        dayindex++;
        await DayModel.findByIdAndUpdate({ _id: day._id }, { day: dayindex })

    })
    await trip.save()
    res.json(trip)
}

module.exports.editDestination = async (req, res) => {
    const { id, destination } = req.body;
    const trip = await TripModel.findByIdAndUpdate({ _id: id }, { destination })
    TripModel.find()
        .then(trips => res.json({ trips, trip }))
        .catch(err => res.json(err))
}