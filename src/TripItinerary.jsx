import Day from './Day';
import { useState, useEffect } from 'react';
import './Day.css';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import './TripList.css'
import Activity from './Activity'
import Trip from './Trip';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import '../public/stylesheets/title.css'
import DeleteIcon from '@mui/icons-material/Delete';


export default function TripItinerary({ trip, focusATrip, focusedTrip, editDestinationFun, deleteFun, cancelAddFun }) {
    const [focusedDay, setFocusedDay] = useState("")
    const [focusedActivity, setFocusedActivity] = useState("")
    const [tabValue, setTabValue] = useState('0');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };




    useEffect(() => {
        setFocusedActivity("")

    }, [focusedDay, focusedTrip])

    useEffect(() => {
        setFocusedDay("")
        setTabValue('0')
    }, [focusedTrip])


    const addADay = async () => {
        const id = trip._id
        await axios.patch(`http://localhost:3001/trips/${id}/duration`, { id })
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

    const deleteADay = async (dayId) => {
        await axios.delete(`http://localhost:3001/trips/${trip._id}/days/${dayId}`, {
            params: { tripId: trip._id, dayId: dayId }
        })
            .then(trip => {
                focusATrip(trip.data._id)
                setFocusedActivity("")
                setTabValue('0')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <Box >
            <Typography variant='h3' sx={{ fontWeight: 'bold', color: 'secondary.main', textShadow: ' 2px 2px 4px grey', display: { xs: 'none', sm: 'block' } }}>
                {trip.destination}
            </Typography>
            <Typography variant='h8' component={'div'} sx={{ color: 'grey' }}>
                {trip.duration} {trip.duration === 1 ? " day " : " days "}
                <Tooltip title="Add a day">
                    <IconButton onClick={addADay} >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Typography>
            {/* sx={{ maxWidth: { xs: 250, sm: 380 }, bgcolor: 'background.paper' }} */}
            <Box sx={{ bgcolor: 'background.paper' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable"
                            scrollButtons allowScrollButtonsMobile
                        >
                            {/* <Tab label="Item One" value="1" />
                                <Tab label="Item Two" value="2" />
                                <Tab label="Item Three" value="3" /> */}
                            {trip.days.map((day, i) => {
                                const labbelText = "Day " + day.day
                                return <Tab key={i} label={labbelText} value={i.toString()} />
                            })}
                        </TabList>
                    </Box>
                    {/* <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel> */}
                    {trip.days.map((day, i) => (
                        <TabPanel value={i.toString()} key={day._id}>
                            <Day day={day} key={day._id} showActivity={showActivity} deleteDay={deleteADay} />
                        </TabPanel>
                    ))}

                </TabContext>
            </Box>
            {/* {focusedActivity !== "" && <div className="TripItinerary"><Activity activity={focusedActivity} showActivity={showActivity} /></div>} */}

        </Box >

    )
}