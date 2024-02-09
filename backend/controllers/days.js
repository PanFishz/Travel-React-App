const DayModel = require('../models/Day')
const ActivityModel = require('../models/Activity');
const NoteModel = require('../models/Note');
const { cloudinary } = require('../cloudinary')


module.exports.getADay = async (req, res) => {
    const { id } = req.query;
    await DayModel.findById(id).populate({ path: 'activities', populate: { path: 'notes' } })
        .then(day => res.json(day))
        .catch(err => res.json(err))
}

module.exports.deleteAnActivityFromDay = async (req, res) => {
    const { dayId, id } = req.query;
    const day = await DayModel.findById(dayId)
    await day.activities.pull({ _id: id })
    const activity = await ActivityModel.findById(id).populate('notes')
    activity.notes.map(async (note) => {
        const deletedNote = await NoteModel.findByIdAndDelete(note._id)
        if (deletedNote.filename) {
            await cloudinary.uploader.destroy(deletedNote.filename);
        }
    })
    await ActivityModel.findByIdAndDelete(id)
    await day.save()
    res.json(await day.populate({ path: 'activities', populate: { path: 'notes' } }))
}

module.exports.addAnActivityToDay = async (req, res) => {
    const { id, activity, userId } = req.body;
    const day = await DayModel.findById(id)
    const act = new ActivityModel(activity)
    act.author = userId
    await act.save()
    day.activities.push(act)
    await day.save()
    const response = {
        day: await day.populate({ path: 'activities', populate: { path: 'notes' } }),
        activity: act
    }
    res.json(response)
}