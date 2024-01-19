const ActivityModel = require('../models/Activity');
const NoteModel = require('../models/Note');

module.exports.addANote = async (req, res) => {
    const { id, note } = req.body;
    const activity = await ActivityModel.findById(id)
    const newNote = new NoteModel(note)
    await newNote.save()
    activity.notes.push(newNote)
    await activity.save()
    newActivity = await activity.populate('notes')
    res.json(newActivity)
}

module.exports.editTitleOfActivity = async (req, res) => {
    const { id, title } = req.body;
    await ActivityModel.updateOne({ _id: id }, { title })
    ActivityModel.findById(id)
        .then(async activity => res.json(await activity.populate('notes')))
        .catch(err => res.json(err))
}

module.exports.editLocationOfActivity = async (req, res) => {
    const { id, location } = req.body;
    await ActivityModel.updateOne({ _id: id }, { location })
    ActivityModel.findById(id)
        .then(async activity => {
            const newActivity = await activity.populate('notes')
            res.json(newActivity)
        })
}

module.exports.deleteANote = async (req, res) => {
    const { activityId, noteId } = req.query;
    const activity = await ActivityModel.findById(activityId)
    await activity.notes.pull({ _id: noteId })
    await NoteModel.findByIdAndDelete(noteId)
    await activity.save()
    res.json(await activity.populate('notes'))
}

module.exports.editANote = async (req, res) => {
    const { activityId, noteId, note } = req.body;
    const newNote = await NoteModel.findByIdAndUpdate({ _id: noteId }, { category: note.category, content: note.content })
    res.json(await ActivityModel.findById(activityId).populate('notes'))
}

