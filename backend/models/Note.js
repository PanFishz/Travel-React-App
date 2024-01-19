const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['address', 'url', 'image', 'note'],
    },
    content: {
        type: String
    }


})

const NoteModel = mongoose.model('Note', NoteSchema)
module.exports = NoteModel