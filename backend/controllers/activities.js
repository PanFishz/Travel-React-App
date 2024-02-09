const ActivityModel = require('../models/Activity');
const NoteModel = require('../models/Note');
const { cloudinary } = require('../cloudinary')

module.exports.addANote = async (req, res) => {
    const { id, note, userId } = req.body;
    const activity = await ActivityModel.findById(id)
    const newNote = new NoteModel(note)

    //const images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    newNote.author = userId
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
    const deletedNote = await NoteModel.findByIdAndDelete(noteId)
    if (deletedNote.filename) {
        await cloudinary.uploader.destroy(deletedNote.filename);
    }
    await activity.save()
    res.json(await activity.populate('notes'))
}

module.exports.editANote = async (req, res) => {
    const { activityId, noteId, note, filename } = req.body;
    if (filename) {
        await cloudinary.uploader.destroy(filename);
    }
    const newNote = await NoteModel.findByIdAndUpdate({ _id: noteId }, note)
    res.json(await ActivityModel.findById(activityId).populate('notes'))
}

module.exports.getImageUrl = (req, res) => {
    // const imageName = req.file.filename
    // const description = req.body.category
    console.log("PPPP", req.body, req.file.path, req.file.filename)
    // Save this data to a database probably
    //console.log(description, imageName)
    res.send({ category: 'image', content: req.file.path, filename: req.file.filename })
}
