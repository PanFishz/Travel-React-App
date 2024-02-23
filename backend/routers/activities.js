const express = require('express')
const router = express.Router()
const activities = require('../controllers/activities.js')
const middlewares = require('../middlewares.js')
const { storage } = require('../cloudinary')
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
//so we can use "upload.array('gameImages')" as below
const multer = require('multer');
const upload = multer({ storage });

const { isLoggedIn, isActivityAuthor, isNoteAuthor } = require('../middlewares.js')


router.post(`/:id/note`, isLoggedIn, isActivityAuthor, middlewares.validateNote, activities.addANote)

router.patch('/:id/title', isLoggedIn, isActivityAuthor, middlewares.validateActivityTitle, activities.editTitleOfActivity)

router.patch('/:id/location', isLoggedIn, isActivityAuthor, middlewares.validateActivityLocation, activities.editLocationOfActivity)

router.patch('/:activityId/notes/:noteid', isLoggedIn, isNoteAuthor, middlewares.validateNote, activities.editANote)

//delete a note
router.delete('/:activityId/notes/:id', isLoggedIn, isNoteAuthor, activities.deleteANote)

//upload.single() matches req.file; uload.array() matches req.files
router.post('/:id/images', isLoggedIn, upload.single('file'), activities.getImageUrl)

module.exports = router;