import { useState, useEffect, useContext } from 'react';
import axios from './api/axios';
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
    const [cookies, setCookie] = useCookies(['id', 'username']);

    //TODO, use seesion to avoid saving sensitive info in cookies
    // useEffect(() => {
    //     async function getUser() {
    //         await axios.get('/user', { withCredentials: true })
    //             .then(response => {
    //                 console.log(response)
    //                 setAuth({ id: response.data._id, username: response.data.username })
    //             })
    //             .catch(err => console.log(err))
    //     }
    //     getUser();
    //     console.log("auth3", auth)

    // }, [])

    useEffect(() => {
        async function fetchData() {
            // await axios.get('/trips', { withCredentials: true, })
            await axios({
                method: "get",
                url: '/trips',
                withCredentials: true,
                params: {
                    id: cookies.id,
                },
            })
                .then(response => {
                    setTrips(response.data.trips)
                })
                .catch(err => console.log(err))
        }
        if (cookies.id !== "") {
            fetchData();
            setAuth({ id: cookies.id, username: cookies.username })
        }
    }, [displayingTrip, focusedTrip, cookies])



    const addATrip = async (trip) => {
        axios.post('/trips', { id: cookies.id, trip: trip }, { withCredentials: true, })
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
            params: { id: id, userId: cookies.id },
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
        await axios.get('/logout', { params: { id: cookies.id }, withCredentials: true, })
            .then(response => {
                setCookie('id', "");
                setCookie('username', "");
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
            {/* //TODO use auth instead cookies */}
            {!cookies.id && <><Authentication setCookie={setCookie} /></>}
            {cookies.id && <><NavBar
                addATrip={() => setAddTripFormVisible(true)}
                getTripList={getTripList}
                unfocusTrips={() => { setFocusedTrip(""); setDisplayingTrip({}) }}
                cancelAddTrip={() => setAddTripFormVisible(false)}
                trip={displayingTrip.destination}
                logout={logout}
                user={auth.username} />


                <Box component="main" sx={{ pt: 5, maxWidth: { xs: 330, sm: 600, md: 800, lg: 1000, xl: 1300 } }} >

                    {!addTripFormVisible && !focusedTrip && (<>{trips && trips.length > 0 ? <AddIcon onClick={() => setAddTripFormVisible(true)} /> : <button onClick={() => setAddTripFormVisible(true)} >Add A Trip</button>}</>)}
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
                            cancelAddFun={cancelAddTrip}
                            user={cookies.id} />
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