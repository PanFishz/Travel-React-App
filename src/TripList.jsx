import { useState, useEffect } from "react";
import axios from 'axios';
import Trip from "./Trip";
import AddTripForm from './AddTripForm';
import TripItinerary from "./TripItinerary";
import './TripList.css'
import './TripItinerary.css'
import NavBar from './components/NavBar';
import SingleTripInMenu from './components/SingleTripInMenu';
import AddIcon from '@mui/icons-material/Add';


import Box from '@mui/material/Box';



export default function TripList({ isMobile }) {
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
        axios.post('http://localhost:3001/trips', trip)
            .then(trip => {
                setDisplayingTrip(trip.data);
                setFocusedTrip(trip.data._id)
            }
            )
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

    const getTripList = () => {
        return (
            <>
                {trips.map(trip => {
                    return <SingleTripInMenu trip={trip} key={trip._id} selectFun={focusATrip} />
                })}
            </>

        )
    }

    const cancelAddTrip = () => {
        setAddTripFormVisible(false)
    }


    return (
        <Box>

            <NavBar
                addATrip={() => setAddTripFormVisible(true)}
                getTripList={getTripList}
                unfocusTrips={() => { setFocusedTrip(""); setDisplayingTrip({}) }}
                cancelAddTrip={() => setAddTripFormVisible(false)}
                trip={displayingTrip.destination} />

            {/* {!isMobile && */}
            {/* maxWidth: { xs: 400, sm: 600, md: 800, lg: 1000, xl: 1300 } */}
            <Box component="main" sx={{ pt: 5, maxWidth: { xs: 330, sm: 600, md: 800, lg: 1000, xl: 1300 } }} >

                {!addTripFormVisible && !focusedTrip && <AddIcon onClick={() => setAddTripFormVisible(true)} />}
                {addTripFormVisible && <AddTripForm submitFun={addATrip} cancelFun={() => setAddTripFormVisible(false)} />}
                {!focusedTrip &&
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'stretch' }}>
                        {trips.map(trip => {
                            return <Trip trip={trip} key={trip._id} deleteFun={deleteATrip} selectFun={focusATrip} editDestinationFun={editADest} cancelAddFun={cancelAddTrip} />
                        })}
                    </Box>}

                {focusedTrip !== "" && !addTripFormVisible &&

                    <TripItinerary

                        trip={displayingTrip}
                        focusATrip={focusATrip}
                        focusedTrip={focusedTrip}
                        editDestinationFun={editADest}
                        deleteFun={deleteATrip}
                        cancelAddFun={cancelAddTrip} />
                }
            </Box>
            {/* } */}

            {/* {isMobile &&
                <div className="TripList">
                    <div className="TripItinerary">
                        {addTripFormVisible && <div><AddTripForm submitFun={addATrip} cancelFun={() => setAddTripFormVisible(false)} /></div>}
                        {trips.map(trip => {
                            return <Trip trip={trip} key={trip._id} deleteFun={deleteATrip} selectFun={focusATrip} editDestinationFun={editADest} />
                        })}
                    </div>
                    {focusedTrip !== "" && <div className="TripItinerary"><TripItinerary trip={displayingTrip} focusATrip={focusATrip} focusedTrip={focusedTrip} /></div>}
                </div>
            } */}
        </Box>
    )
}

// Methods	Urls	Actions
// POST	/api/tutorials	create new Tutorial
// GET	/api/tutorials	retrieve all Tutorials
// GET	/api/tutorials/:id	retrieve a Tutorial by :id
// PUT	/api/tutorials/:id	update a Tutorial by :id
// DELETE	/api/tutorials/:id	delete a Tutorial by :id
// DELETE	/api/tutorials	delete all Tutorials
// GET	/api/tutorials?title=[keyword]	