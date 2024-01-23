const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TripModel = require('./models/Trip')
const DayModel = require('./models/Day')
const ActivityModel = require('./models/Activity');
const NoteModel = require('./models/Note');
const tripsRouter = require('./routers/trips.js')
const daysRouter = require('./routers/days.js')
const activitiesRouter = require('./routers/activities.js')

const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'images/' })

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017/travel"

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI)
        console.log('Mongo connected')
        // const trip = await TripModel.findOne({ destination: 'NY' })
        // console.log(trip)
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}
connectToMongo();
app.use('/trips', tripsRouter);
app.use('/days', daysRouter);
app.use('/activities', activitiesRouter);



// app.get('/trips', (req, res) => {
//     TripModel.find()
//         .then(trips => res.json(trips))
//         .catch(err => res.json(err))
// })

// app.get('/trips/:id', (req, res) => {
//     const { id } = req.query;
//     TripModel.findOne({ _id: id }).populate({ path: 'days', populate: { path: 'activities' } })
//         .then(trip => res.json(trip))
//         .catch(err => res.json(err))
// })

// app.get('/days/:id', (req, res) => {
//     const { id } = req.query;
//     DayModel.findById(id).populate({ path: 'activities', populate: { path: 'notes' } })
//         .then(day => res.json(day))
//         .catch(err => res.json(err))
// })

// app.post('/trips', async (req, res) => {
//     const newTrip = new TripModel(req.body);
//     const numDays = req.body.duration;
//     for (let i = 1; i <= numDays; i++) {
//         const day = new DayModel({ day: i, activities: [] })
//         await day.save();
//         newTrip.days.push(day);
//     }
//     const result = newTrip.save();
//     console.log(newTrip)
//     res.send(result)

// })

// app.post('/days/:id/addAnActivity', async (req, res) => {
//     const { id } = req.query;
//     const day = await DayModel.findById(id)
//     const activity = new ActivityModel(req.body)
//     await activity.save()
//     day.activities.push(activity)
//     await day.save()
//     const response = {
//         day: await day.populate({ path: 'activities', populate: { path: 'notes' } }),
//         activity: activity
//     }
//     res.json(response)
// })

// app.post(`/activities/:id/note`, async (req, res) => {
//     const { id, note } = req.body;
//     console.log(id, note)
//     const activity = await ActivityModel.findById(id)
//     console.log(activity)
//     const newNote = new NoteModel(note)
//     console.log(newNote)
//     await newNote.save()
//     activity.notes.push(newNote)
//     await activity.save()
//     console.log(activity)
//     newActivity = await activity.populate('notes')
//     console.log(newActivity)
//     res.json(newActivity)
// })

// //patch use req.body
// app.patch('/trips/:id/destination', async (req, res) => {
//     const { id, destination } = req.body;
//     const trip = await TripModel.findByIdAndUpdate({ _id: id }, { destination })
//     TripModel.find()
//         .then(trips => res.json({ trips, trip }))
//         .catch(err => res.json(err))
// })

// app.patch('/activities/:id/title', async (req, res) => {
//     const { id, title } = req.body;
//     await ActivityModel.updateOne({ _id: id }, { title })
//     ActivityModel.findById(id)
//         .then(async activity => res.json(await activity.populate('notes')))
//         .catch(err => res.json(err))
// })

// app.patch('/activities/:id/location', async (req, res) => {
//     const { id, location } = req.body;
//     await ActivityModel.updateOne({ _id: id }, { location })
//     ActivityModel.findById(id)
//         .then(async activity => {
//             const newActivity = await activity.populate('notes')
//             res.json(newActivity)
//         })
// })

// app.patch('/trips/:id/duration', async (req, res) => {
//     const { id } = req.body;
//     const trip = await TripModel.findByIdAndUpdate({ _id: id }, { $inc: { duration: 1 } })
//     const newDay = new DayModel({ day: trip.duration + 1, activities: [] })
//     trip.days.push(newDay)
//     await newDay.save();
//     await trip.save();
//     res.json(trip)
// })

// app.patch('/activities/:activityId/notes/:noteid', async (req, res) => {
//     const { activityId, noteId, note } = req.body;
//     console.log(activityId, noteId, note)
//     const newNote = await NoteModel.findByIdAndUpdate({ _id: noteId }, { category: note.category, content: note.content })
//     res.json(await ActivityModel.findById(activityId).populate('notes'))
// })

// //delete a trip
// app.delete('/trips/:id', async (req, res) => {
//     const { id } = req.query;
//     const trip = await TripModel.findById(id).populate({ path: 'days', populate: { path: 'activities', populate: { path: 'notes' } } })
//     trip.days.map(async (day) => {
//         day.activities.map(async (activity) => {
//             activity.notes.map(async (note) => {
//                 await NoteModel.findByIdAndDelete(note._id)
//             })
//             await ActivityModel.findByIdAndDelete(activity._id)
//         })
//         await DayModel.findByIdAndDelete(day._id)
//     })
//     TripModel.findOneAndDelete({ _id: id })
//         .then(id => res.json(id))
//         .catch(err => res.json(err))
// })

// //delete a day 
// app.delete('/trips/:tripId/days/:dayId', async (req, res) => {
//     const { tripId, dayId } = req.query;
//     let trip = await TripModel.findByIdAndUpdate({ _id: tripId }, { $inc: { duration: -1 } })
//     await trip.days.pull({ _id: dayId })
//     const day = await DayModel.findById(dayId).populate({ path: 'activities', populate: { path: 'notes' } })
//     console.log(day)
//     day.activities.map(async (activity) => {
//         activity.notes.map(async (note) => {
//             await NoteModel.findByIdAndDelete(note._id)
//         })
//         await ActivityModel.findByIdAndDelete(activity._id)
//     })
//     await DayModel.findByIdAndDelete(dayId)
//     await trip.save()
//     trip = await trip.populate('days')
//     // for (let i = 1; i < trip.duration; i++) {
//     //     console.log(trip.days[i - 1], trip.days[i - 1].day, i)
//     //     trip.days[i - 1].day = i
//     //     console.log(trip.days[i - 1], trip.days[i - 1].day, i)
//     //     await trip.save()
//     // }
//     let dayindex = 0
//     trip.days.map(async (day) => {

//         dayindex++;
//         await DayModel.findByIdAndUpdate({ _id: day._id }, { day: dayindex })

//     })
//     await trip.save()
//     res.json(trip)
// })

// delete an activity
// app.delete('/days/:dayId/activities/:id', async (req, res) => {
//     const { dayId, activityId } = req.query;
//     console.log(dayId, activityId)
//     const day = await DayModel.findById(dayId)
//     await day.activities.pull({ _id: activityId })
//     const activity = await ActivityModel.findById(activityId).populate('notes')
//     activity.notes.map(async (note) => {
//         await NoteModel.findByIdAndDelete(note._id)
//     })
//     await ActivityModel.findByIdAndDelete(activityId)
//     await day.save()
//     res.json(await day.populate({ path: 'activities', populate: { path: 'notes' } }))
//     // DayModel.findOneAndDelete({ _id: id })
//     //     .then(id => res.json(id))
//     //     .catch(err => res.json(err))

// })

//delete a note
// app.delete('/activities/:activityId/notes/:id', async (req, res) => {
//     const { activityId, noteId } = req.query;
//     console.log(activityId, noteId)
//     const activity = await ActivityModel.findById(activityId)
//     await activity.notes.pull({ _id: noteId })
//     await NoteModel.findByIdAndDelete(noteId)
//     await activity.save()
//     res.json(await activity.populate('notes'))
//     // DayModel.findOneAndDelete({ _id: id })
//     //     .then(id => res.json(id))
//     //     .catch(err => res.json(err))

// })



app.listen(3001, () => {
    console.log("Port 3001 is listening")
})
