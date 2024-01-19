const express = require('express')
const router = express.Router()
const { addANote, editTitleOfActivity, editLocationOfActivity, editANote, deleteANote } = require('../controllers/activities.js')
const { validateActivityTitle, validateActivityLocation, validateActivity, validateNote } = require('../middlewares.js')

router.post(`/:id/note`, validateNote, addANote)

router.patch('/:id/title', validateActivityTitle, editTitleOfActivity)

router.patch('/:id/location', validateActivityLocation, editLocationOfActivity)

router.patch('/:activityId/notes/:noteid', validateNote, editANote)

//delete a note
router.delete('/:activityId/notes/:id', deleteANote)






module.exports = router;