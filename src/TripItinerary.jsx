import Day from './Day';
import { useState, useEffect } from 'react';
import './Day.css';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import './TripList.css'
import Activity from './Activity'

export default function TripItinerary({ trip, focusATrip, focusedTrip }) {
    const [focusedDay, setFocusedDay] = useState("")
    const [focusedActivity, setFocusedActivity] = useState("")
    // const [hasFocusedActivity, setHasFocusedActivity] = useState(false)


    useEffect(() => {
        setFocusedActivity("")
    }, [focusedDay, focusedTrip])

    useEffect(() => {
        setFocusedDay("")
    }, [focusedTrip])


    const addADay = () => {
        const id = trip._id
        axios.patch(`http://localhost:3001/trips/${id}/duration`, { id })
            .then(trip => {
                focusATrip(trip.data._id)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const showActivity = (activity) => {
        setFocusedActivity(activity)
    }

    const deleteADay = (dayId) => {
        axios.delete(`http://localhost:3001/trips/${trip._id}/days/${dayId}`, {
            params: { tripId: trip._id, dayId: dayId }
        })
            .then(trip => {
                focusATrip(trip.data._id)
                setFocusedActivity("")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='TripList'>
            <div className="TripItinerary">
                <div ><h3> {trip.destination} </h3>
                    <h4> {trip.duration} days! <AddIcon onClick={addADay} /></h4></div>

                <div>
                    {trip.days && trip.days.map(day => {
                        if (focusedDay === day._id) {
                            return <Day key={day._id} day={day} showActivity={showActivity} deleteDay={deleteADay} />
                        } else {
                            return <div className="Day" key={day._id} onClick={() => { setFocusedDay(day._id); console.log(focusedDay) }}>Day {day.day} </div>
                        }
                    })}
                </div>
            </div>

            {focusedActivity !== "" && <div className="TripItinerary"><Activity activity={focusedActivity} showActivity={showActivity} /></div>}


        </div >

    )
}