const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
    filename: String
})
imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})


const NoteSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['address', 'url', 'image', 'note'],
    },
    content: {
        type: String
    },
    filename: {
        type: String
    }
})

const NoteModel = mongoose.model('Note', NoteSchema)
module.exports = NoteModel