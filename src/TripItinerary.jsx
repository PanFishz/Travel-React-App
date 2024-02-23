import Day from './Day';
import { useState, useEffect } from 'react';
import './Day.css';
import './TripItinerary.css'
import AddIcon from '@mui/icons-material/Add';
import axios from './api/axios';
import './TripList.css'
import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import '../public/stylesheets/title.css'


export default function TripItinerary({ trip, focusATrip, focusedTrip, user, setMessage, editDestinationFun, deleteFun, cancelAddFun }) {
    const [tabValue, setTabValue] = useState('0');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        setTabValue('0')
    }, [focusedTrip])


    const addADay = async () => {
        const id = trip._id
        await axios.patch(`/trips/${id}/duration`, { id: id, userId: user }, { withCredentials: true, })
            .then(trip => {
                focusATrip(trip.data._id)
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const deleteADay = async (dayId) => {
        await axios.delete(`/trips/${trip._id}/days/${dayId}`, {
            params: { tripId: trip._id, id: dayId },
            withCredentials: true,
        })
            .then(trip => {
                focusATrip(trip.data._id)
                setTabValue('0')
            })
            .catch(function (error) {
                console.log(error.response);
                setMessage(error.response.data.message)
            });
    }


    return (
        <Box className="TripItinerary" sx={{ minWidth: { xs: 360, sm: 560, md: 860, lg: 1100, xl: 1200 }, minHeight: 550 }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold', textShadow: ' 2px 2px 4px grey', display: { xs: 'none', sm: 'block' } }}>
                {trip.destination}
            </Typography>
            <Typography variant='h7' component={'div'} >
                {trip.duration} {trip.duration === 1 ? " day " : " days "}
                <Tooltip title="Add a day">
                    <IconButton onClick={addADay} >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Typography>
            <Box >
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="days tabs" variant="scrollable"
                            scrollButtons allowScrollButtonsMobile
                        >
                            {/* <Tab label="Item One" value="1" />
                                <Tab label="Item Two" value="2" />
                                <Tab label="Item Three" value="3" /> */}
                            {trip.days.map((day, i) => {
                                const labbelText = "Day " + (i + 1)
                                return <Tab key={i} label={labbelText} value={i.toString()} sx={{ color: 'textcolor.lightest' }} />
                            })}
                        </TabList>
                    </Box>
                    {/* <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel> */}
                    {trip.days.map((day, i) => (
                        <TabPanel value={i.toString()} key={day._id}>
                            <Day day={day} dayIndex={i + 1} isOneDay={trip.duration === 1} key={day._id} user={user} deleteDay={deleteADay} setMessage={setMessage} />
                        </TabPanel>
                    ))}

                </TabContext>
            </Box>
        </Box >
    )
}