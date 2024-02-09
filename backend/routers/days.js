const express = require('express')
const router = express.Router()
const { getADay, addAnActivityToDay, deleteAnActivityFromDay } = require('../controllers/days.js')
const { validateActivity } = require('../middlewares.js')
const { isLoggedIn, isDayAuthor, isActivityAuthor } = require('../middlewares.js')


router.get('/:id', isLoggedIn, isDayAuthor, getADay)

router.post('/:id/addAnActivity', isLoggedIn, isDayAuthor, validateActivity, addAnActivityToDay)

// delete an activity
router.delete('/:dayId/activities/:id', isLoggedIn, isActivityAuthor, deleteAnActivityFromDay)

module.exports = router;