const express = require('express')
const router = express.Router()
const { getADay, addAnActivityToDay, deleteAnActivityFromDay } = require('../controllers/days.js')
const { validateActivity } = require('../middlewares.js')

router.get('/:id', getADay)

router.post('/:id/addAnActivity', validateActivity, addAnActivityToDay)

// delete an activity
router.delete('/:dayId/activities/:id', deleteAnActivityFromDay)

module.exports = router;