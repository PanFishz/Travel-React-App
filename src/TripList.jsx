import { useState, useEffect } from "react";
import axios from 'axios';
import Trip from "./Trip";
import AddTripForm from './AddTripForm';
import TripItinerary from "./TripItinerary";
import './TripList.css'
import './TripItinerary.css'
import CloseIcon from '@mui/icons-material/Close';

export default function TripList() {
    const [trips, setTrips] = useState([]);
    const [addTripFormVisible, setAddTripFormVisible] = useState(false)
    const [focusedTrip, setFocusedTrip] = useState("")
    const [displayingTrip, setDisplayingTrip] = useState({})


    useEffect(() => {
        axios.get('http://localhost:3001/trips')
            .then(trips => setTrips(trips.data))
            .catch(err => console.log(err))
    }, [trips])

    const addATrip = async (trip) => {
        axios.post('http://localhost:3001/', trip)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setAddTripFormVisible(false)
    }

    const deleteATrip = (id) => {
        axios.delete(`http://localhost:3001/trips/${id}`, {
            params: { id }
        })
            .then(function (response) {
                setFocusedTrip("")
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //re-render and focus on a trip on the second column
    const focusATrip = (id) => {
        axios.get(`http://localhost:3001/trips/${id}`, {
            params: { id }
        })
            .then(trip => {
                setDisplayingTrip((trip.data));
                setFocusedTrip(trip.data._id);
            })
            .catch(err => console.log(err))

    }
    //patch use req.body
    const editADest = (id, destination) => {
        axios.patch(`http://localhost:3001/trips/${id}/destination`, { id, destination })
            .then(trips => {
                setTrips(trips.data.trips);
                focusATrip(id)
            }
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    // const addADay = (duration) => {
    //     const id = displayingTrip._id
    //     axios.patch(`http://localhost:3001/trips/${id}/duration`, { id, duration })
    //         .then(trips => {
    //             setTrips(trips.data);
    //             setFocusTrip(displayingTrip.duration);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    return (<div className="TripList">
        <div className="TripItinerary">
            {!addTripFormVisible && <button onClick={() => setAddTripFormVisible(true)}>Add a Trip</button>}
            {addTripFormVisible && <div><AddTripForm submitFun={addATrip} cancelFun={() => setAddTripFormVisible(false)} /></div>}
            {trips.map(trip => {
                return <Trip trip={trip} key={trip._id} deleteFun={deleteATrip} selectFun={focusATrip} editDestinationFun={editADest} />
            })}
        </div>

        {focusedTrip !== "" && <div className="TripItinerary"><TripItinerary trip={displayingTrip} focusATrip={focusATrip} focusedTrip={focusedTrip} /></div>}
    </div>)
}

// Methods	Urls	Actions
// POST	/api/tutorials	create new Tutorial
// GET	/api/tutorials	retrieve all Tutorials
// GET	/api/tutorials/:id	retrieve a Tutorial by :id
// PUT	/api/tutorials/:id	update a Tutorial by :id
// DELETE	/api/tutorials/:id	delete a Tutorial by :id
// DELETE	/api/tutorials	delete all Tutorials
// GET	/api/tutorials?title=[keyword]	