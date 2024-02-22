import { useState, useEffect, useContext } from 'react';
import axios from './api/axios';
import Trip from "./Trip";
import Flash from './Flash';
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
//import { useCookies } from 'react-cookie';

export default function TripList({ isMobile, setisLoggedIn }) {
    const [trips, setTrips] = useState([]);
    const [addTripFormVisible, setAddTripFormVisible] = useState(false)
    const [focusedTrip, setFocusedTrip] = useState("")
    const [displayingTrip, setDisplayingTrip] = useState({})
    const { auth, setAuth } = useContext(AuthContext)
    //const [cookies, setCookie] = useCookies(['id', 'username']);
    const [message, setMessage] = useState('')

    useEffect(() => {
        setMessage('')
    }, [trips, addTripFormVisible, focusedTrip, displayingTrip, auth])

    useEffect(() => {
        setAddTripFormVisible(false)
    }, [trips, focusedTrip, displayingTrip, auth])

    useEffect(() => {
        async function fetchData() {
            // await axios.get('/trips', { withCredentials: true, })
            await axios({
                method: "get",
                url: '/trips',
                withCredentials: true,
                params: {
                    id: auth.id,
                },
            })
                .then(response => {
                    setTrips(response.data.trips)
                })
                .catch(err => console.log('Unauthorized'))
        }
        if (auth.id !== "") {
            fetchData();
            //setAuth({ id: auth.id, username: auth.username })
        }
    }, [displayingTrip, focusedTrip, auth])



    const addATrip = async (trip) => {
        axios.post('/trips', { id: auth.id, trip: trip }, { withCredentials: true, })
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
        axios.delete(`/trips/${id}`, {
            params: { id: id, userId: auth.id },
            withCredentials: true,
        })
            .then(function (response) {
                setFocusedTrip("")
                setDisplayingTrip({});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //re-render and focus on a trip on the second column
    const focusATrip = (id) => {
        axios.get(`/trips/${id}`, {
            params: { id },
            withCredentials: true,
        })
            .then(trip => {

                setDisplayingTrip((trip.data));
                setFocusedTrip(trip.data._id);
            })
            .catch(err => console.log(err))
    }

    //patch use req.body
    const editADest = (id, destination) => {
        axios.patch(`/trips/${id}/destination`, { id, destination }, { withCredentials: true, })
            .then(trip => {
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
        await axios.get('/logout', { params: { id: auth.id }, withCredentials: true, })
            .then(response => {
                // setCookie('id', "");
                // setCookie('username', "");
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
        <Box className="TripList">
            {!auth.id && <><Authentication /></>}
            {auth.id &&
                <><NavBar
                    addATrip={() => setAddTripFormVisible(true)}
                    getTripList={getTripList}
                    unfocusTrips={() => { setFocusedTrip(""); setDisplayingTrip({}) }}
                    cancelAddTrip={() => setAddTripFormVisible(false)}
                    trip={displayingTrip.destination}
                    logout={logout}
                    user={auth.username}
                    setMessage={setMessage} />


                    <Box component="main" sx={{ pt: { xs: 2, sm: 5 }, maxWidth: { xs: 330, sm: 600, md: 800, lg: 1000, xl: 1300 } }} >
                        {message && <Flash message={message} setMessage={setMessage} />}
                        {!addTripFormVisible && !focusedTrip && (<>{trips && trips.length > 0 ? <AddIcon onClick={() => setAddTripFormVisible(true)} /> : <button onClick={() => setAddTripFormVisible(true)} >Add A Trip</button>}</>)}
                        {addTripFormVisible && <AddTripForm submitFun={addATrip} cancelFun={() => setAddTripFormVisible(false)} />}
                        {!focusedTrip && !addTripFormVisible &&

                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'stretch' }}>
                                {trips && trips.map(trip => {
                                    return <Trip trip={trip} key={trip._id} deleteFun={deleteATrip} selectFun={focusATrip} editDestinationFun={editADest} cancelAddFun={cancelAddTrip} setMessage={setMessage} />
                                })}
                            </Box>}

                        {focusedTrip !== "" && !addTripFormVisible &&

                            <TripItinerary

                                trip={displayingTrip}
                                focusATrip={focusATrip}
                                focusedTrip={focusedTrip}
                                editDestinationFun={editADest}
                                deleteFun={deleteATrip}
                                cancelAddFun={cancelAddTrip}
                                user={auth.id}
                                setMessage={setMessage} />
                        }
                    </Box></>
            }


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