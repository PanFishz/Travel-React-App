const express = require('express')
const router = express.Router()
const { addANote, editTitleOfActivity, editLocationOfActivity, editANote, deleteANote, getImageUrl } = require('../controllers/activities.js')
const { validateActivityTitle, validateActivityLocation, validateActivity, validateNote } = require('../middlewares.js')
const { storage } = require('../cloudinary')
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
//so we can use "upload.array('gameImages')" as below
const multer = require('multer');
const upload = multer({ storage });
//const upload = multer({ dest: 'uploads/' });

//validateNote upload.single("images")
router.post(`/:id/note`, validateNote, addANote)

router.patch('/:id/title', validateActivityTitle, editTitleOfActivity)

router.patch('/:id/location', validateActivityLocation, editLocationOfActivity)

router.patch('/:activityId/notes/:noteid', validateNote, editANote)

//delete a note
router.delete('/:activityId/notes/:id', deleteANote)

//router.delete('/images/:filename', deleteAnImage)

//upload.single() matches req.file; uload.array() matches req.files
router.post('/:id/images', upload.single('file'), getImageUrl)



module.exports = router;