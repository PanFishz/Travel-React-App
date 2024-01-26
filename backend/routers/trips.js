const express = require('express')
const router = express.Router()
const { validateAddATripForm, validateDestination } = require('../middlewares')
const { getAllTrips, getOneTrip, addATrip, editDestination, addADayToTrip, deleteATrip, deleteADayFromTrip } = require('../controllers/trips.js')


router.get('/', getAllTrips)

router.get('/:id', getOneTrip)

router.post('/', validateAddATripForm, addATrip)

//patch use req.body
router.patch('/:id/destination', validateDestination, editDestination)

router.patch('/:id/duration', addADayToTrip)

//delete a trip
router.delete('/:id', deleteATrip)

//delete a day 
router.delete('/:tripId/days/:dayId', deleteADayFromTrip)

module.exports = router;