const ActivityModel = require('../models/Activity');
const NoteModel = require('../models/Note');
const { cloudinary } = require('../cloudinary')

module.exports.addANote = async (req, res, next) => {
    try {
        const { id, note, userId } = req.body;
        const activity = await ActivityModel.findById(id)
        const newNote = new NoteModel(note)
        newNote.author = userId
        await newNote.save()
        activity.notes.push(newNote)
        await activity.save()
        const newActivity = await activity.populate('notes')
        res.json(newActivity)
    } catch (error) { // manually catching
        next(error) // passing to default middleware error handler
    }

}

module.exports.editTitleOfActivity = async (req, res) => {
    const { id, title } = req.body;
    await ActivityModel.updateOne({ _id: id }, { title })
        .catch(err => next(err))
    ActivityModel.findById(id)
        .then(async activity => res.json(await activity.populate('notes')))
        .catch(err => res.json(err))
}

module.exports.editLocationOfActivity = async (req, res) => {

    const { id, location } = req.body;
    await ActivityModel.updateOne({ _id: id }, { location })
        .catch(err => next(err))
    ActivityModel.findById(id)
        .then(async activity => {
            const newActivity = await activity.populate('notes')
            res.json(newActivity)
        })
        .catch(err => res.json(err))


}

module.exports.deleteANote = async (req, res, next) => {
    try {

        const { activityId, noteId } = req.query;

        if (await NoteModel.findById(noteId)) {
            const activity = await ActivityModel.findById(activityId)
            await activity.notes.pull({ _id: noteId })
            const deletedNote = await NoteModel.findByIdAndDelete(noteId)
            if (deletedNote.filename) {
                await cloudinary.uploader.destroy(deletedNote.filename);
            }
            await activity.save()
            res.json(await activity.populate('notes'))
        }


    } catch (error) { // manually catching
        next(error) // passing to default middleware error handler
    }

}

module.exports.editANote = async (req, res, next) => {
    try {
        const { activityId, noteId, note, filename } = req.body;
        if (filename) {
            await cloudinary.uploader.destroy(filename);
        }
        const newNote = await NoteModel.findByIdAndUpdate({ _id: noteId }, note)
        res.json(await ActivityModel.findById(activityId).populate('notes'))
    } catch (err) {
        next(err)
    }
}

module.exports.getImageUrl = (req, res) => {
    res.send({ category: 'image', content: req.file.path, filename: req.file.filename })
}
