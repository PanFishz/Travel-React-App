const express = require('express')
const router = express.Router()
const { validateAddATripForm, validateDestination } = require('../middlewares')
const { getAllTrips, getOneTrip, addATrip, editDestination, addADayToTrip, deleteATrip, deleteADayFromTrip } = require('../controllers/trips.js')
const { isLoggedIn, isTripAuthor, isUser, isDayAuthor, isMinDuration } = require('../middlewares.js')


router.get('/', isLoggedIn, isUser, getAllTrips)

router.get('/:id', isLoggedIn, isTripAuthor, getOneTrip)

router.post('/', isLoggedIn, validateAddATripForm, addATrip)

//patch use req.body
router.patch('/:id/destination', isLoggedIn, isTripAuthor, validateDestination, editDestination)

router.patch('/:id/duration', isLoggedIn, isTripAuthor, addADayToTrip)

//delete a trip
router.delete('/:id', isLoggedIn, isTripAuthor, deleteATrip)

//delete a day 
router.delete('/:tripId/days/:dayId', isLoggedIn, isDayAuthor, isMinDuration, deleteADayFromTrip)

module.exports = router;