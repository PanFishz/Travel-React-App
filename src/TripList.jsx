import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Trip from "./Trip";
import AddTripForm from './AddTripForm';
import TripItinerary from "./TripItinerary";
import './TripList.css'
import './TripItinerary.css'
import NavBar from './components/NavBar';
import SingleTripInMenu from './components/SingleTripInMenu';
import AddIcon from '@mui/icons-material/Add';
import Authentication from "./Authentication";
import Box from '@mui/material/Box';
import AuthContext from "./context/AuthProvider";
import { useCookies } from 'react-cookie';



export default function TripList({ isMobile }) {
    const [trips, setTrips] = useState([]);
    const [addTripFormVisible, setAddTripFormVisible] = useState(false)
    const [focusedTrip, setFocusedTrip] = useState("")
    const [displayingTrip, setDisplayingTrip] = useState({})
    const { auth, setAuth } = useContext(AuthContext)
    const [cookies, setCookie] = useCookies(['id']);

    const getUserName = async (id) => {
        await axios.get(`http://localhost:3001/${id}`, { params: { id: cookies.id } })
            .then(response => {
                console.log('wweee', response.data);
                setAuth({ username: response.data.username })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (cookies.id !== "") getUserName();
    }, []);

    useEffect(() => {
        console.log("user cookie", cookies.id, auth.user, auth.id, auth.username)
        async function fetchData() {
            await axios.get('http://localhost:3001/trips', { params: { id: cookies.id } })
                .then(response => {
                    console.log('p', response.data.trips);
                    setTrips(response.data.trips)
                })
                .catch(err => console.log(err))
        }
        if (cookies.id !== "") fetchData()
    }, [displayingTrip, focusedTrip, cookies])


    const addATrip = async (trip) => {
        console.log(trip, auth.id)
        axios.post('http://localhost:3001/trips', { id: cookies.id, trip: trip })
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
        console.log(auth.id)
        axios.delete(`http://localhost:3001/trips/${id}`, {
            params: { id: id, userId: cookies.id }
        })
            .then(function (response) {
                setFocusedTrip("")
                setDisplayingTrip({});
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
            .then(trip => {
                console.log("ll", trip.data.trip)
                //setTrips(trip.data);
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
                {trips && trips.map(trip => {
                    return <SingleTripInMenu trip={trip} key={trip._id} selectFun={focusATrip} />
                })}
            </>

        )
    }

    const cancelAddTrip = () => {
        setAddTripFormVisible(false)
    }

    const retriveUser = (data) => {
        setUser(data)
    }

    const logout = async () => {
        await axios.get('http://localhost:3001/logout', {})
            .then(response => {
                setCookie('id', "");
                setFocusedTrip("")
                setDisplayingTrip({});
                setTrips([])
                setAuth({})
            }
            )
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <Box>

            {cookies.id === "" && <><Authentication submitFun={retriveUser} setCookie={setCookie} /></>}
            {cookies.id !== "" && <><NavBar
                addATrip={() => setAddTripFormVisible(true)}
                getTripList={getTripList}
                unfocusTrips={() => { setFocusedTrip(""); setDisplayingTrip({}) }}
                cancelAddTrip={() => setAddTripFormVisible(false)}
                trip={displayingTrip.destination}
                logout={logout} />



                <Box component="main" sx={{ pt: 5, maxWidth: { xs: 330, sm: 600, md: 800, lg: 1000, xl: 1300 } }} >

                    {!addTripFormVisible && !focusedTrip && (<>{trips.length > 0 ? <AddIcon onClick={() => setAddTripFormVisible(true)} /> : <button onClick={() => setAddTripFormVisible(true)} >Add A Trip</button>}</>)}
                    {addTripFormVisible && <AddTripForm submitFun={addATrip} cancelFun={() => setAddTripFormVisible(false)} />}
                    {!focusedTrip &&
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'stretch' }}>
                            {trips && trips.map(trip => {
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
                </Box></>}


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