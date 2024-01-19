const express = require('express')
const router = express.Router()
const TripModel = require('../models/Trip')
const DayModel = require('../models/Day')
const ActivityModel = require('../models/Activity');
const NoteModel = require('../models/Note');

router.get('/', (req, res) => {
    TripModel.find()
        .then(trips => res.json(trips))
        .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.query;
    TripModel.findOne({ _id: id }).populate({ path: 'days', populate: { path: 'activities' } })
        .then(trip => res.json(trip))
        .catch(err => res.json(err))
})

router.post('/', async (req, res) => {
    const newTrip = new TripModel(req.body);
    const numDays = req.body.duration;
    for (let i = 1; i <= numDays; i++) {
        const day = new DayModel({ day: i, activities: [] })
        await day.save();
        newTrip.days.push(day);
    }
    const result = newTrip.save();
    console.log(newTrip)
    res.send(result)

})

//patch use req.body
router.patch('/:id/destination', async (req, res) => {
    const { id, destination } = req.body;
    const trip = await TripModel.findByIdAndUpdate({ _id: id }, { destination })
    TripModel.find()
        .then(trips => res.json({ trips, trip }))
        .catch(err => res.json(err))
})

router.patch('/:id/duration', async (req, res) => {
    const { id } = req.body;
    const trip = await TripModel.findByIdAndUpdate({ _id: id }, { $inc: { duration: 1 } })
    const newDay = new DayModel({ day: trip.duration + 1, activities: [] })
    trip.days.push(newDay)
    await newDay.save();
    await trip.save();
    res.json(trip)
})

//delete a trip
router.delete('/:id', async (req, res) => {
    const { id } = req.query;
    const trip = await TripModel.findById(id).populate({ path: 'days', populate: { path: 'activities', populate: { path: 'notes' } } })
    trip.days.map(async (day) => {
        day.activities.map(async (activity) => {
            activity.notes.map(async (note) => {
                await NoteModel.findByIdAndDelete(note._id)
            })
            await ActivityModel.findByIdAndDelete(activity._id)
        })
        await DayModel.findByIdAndDelete(day._id)
    })
    TripModel.findOneAndDelete({ _id: id })
        .then(id => res.json(id))
        .catch(err => res.json(err))
})

//delete a day 
router.delete('/:tripId/days/:dayId', async (req, res) => {
    const { tripId, dayId } = req.query;
    let trip = await TripModel.findByIdAndUpdate({ _id: tripId }, { $inc: { duration: -1 } })
    await trip.days.pull({ _id: dayId })
    const day = await DayModel.findById(dayId).populate({ path: 'activities', populate: { path: 'notes' } })
    console.log(day)
    day.activities.map(async (activity) => {
        activity.notes.map(async (note) => {
            await NoteModel.findByIdAndDelete(note._id)
        })
        await ActivityModel.findByIdAndDelete(activity._id)
    })
    await DayModel.findByIdAndDelete(dayId)
    await trip.save()
    trip = await trip.populate('days')
    // for (let i = 1; i < trip.duration; i++) {
    //     console.log(trip.days[i - 1], trip.days[i - 1].day, i)
    //     trip.days[i - 1].day = i
    //     console.log(trip.days[i - 1], trip.days[i - 1].day, i)
    //     await trip.save()
    // }
    let dayindex = 0
    trip.days.map(async (day) => {

        dayindex++;
        await DayModel.findByIdAndUpdate({ _id: day._id }, { day: dayindex })

    })
    await trip.save()
    res.json(trip)
})

module.exports = router;