import './Day.css';
import AddActivityForm from './AddActivityForm';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Activity from './Activity';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}



export default function Day({ day, showActivity, deleteDay }) {
    const [activityFormVisible, setActivityFormVisible] = useState(false)
    const [activities, setActivities] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/days/${day._id}`, {
            params: { id: day._id }
        })
            .then(activities => {
                setActivities(activities.data.activities)
            })
            .catch(err => console.log(err))
    }, [activities])

    const deleteAnActivity = (id) => {
        axios.delete(`http://localhost:3001/days/${day._id}/activities/${id}`, {
            params: { dayId: day._id, activityId: id }
        })
            .then(
                activities => {
                    setActivities(activities.data.activities)
                    showActivity("")
                    setTabValue(0)
                })
            .catch(err => console.log(err))
    }

    const addAnActivity = (id, activity) => {
        console.log(id, activity);
        axios.post('http://localhost:3001/days/${id}/addAnActivity', activity, {
            params: {
                id
            }
        })
            .then(response => {
                setActivities(response.data.day.activities)
                showActivity(response.data.activity)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const cancelFun = () => {
        setActivityFormVisible(false)
    }


    return (
        <Box>

            <Box>
                <Typography variant='h4' component='div' sx={{ fontWeight: 'bold', color: 'secondary.main', textShadow: ' 2px 2px 4px grey' }}>
                    Day {day.day}
                    <Tooltip title="Delete this day">
                        <IconButton onClick={() => deleteDay(day._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </Box>
            <Box sx={{ display: { sm: 'none' } }}>
                <Typography sx={{ color: 'grey' }} component='div'>Activities:

                    <Tooltip title="Add an activity">
                        <IconButton onClick={() => setActivityFormVisible(true)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
                {activityFormVisible && <AddActivityForm dayId={day._id} submitFun={addAnActivity} submitFun2={() => { setActivityFormVisible(false) }} cancelFun={cancelFun} />}

                {activities.map((activity, i) => (
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel-content"
                            id={i}
                        >
                            {activity.title} - {activity.location}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Activity activity={activity} showActivity={showActivity} deleteActivity={() => deleteAnActivity(activity._id)} />

                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            <Box className="Day" sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}>
                    {activities.length !== 0 && <Tabs
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        value={tabValue}
                        onChange={handleChange}
                        aria-label="tabs example"
                    >
                        {activities.map((activity, i) => (
                            <Tab label={activity.title} key={i} {...a11yProps({ i })} />))
                        }

                    </Tabs>
                    }

                    <Tooltip title="Add an activity">
                        <IconButton onClick={() => setActivityFormVisible(true)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>

                </Box>

                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                >
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, alignContent: 'center', alignItems: 'center' }}>

                        <Tooltip title="Add an activity">
                            <IconButton onClick={() => setActivityFormVisible(true)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>

                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={tabValue}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider', maxHeight: { xs: 350, sm: 400, md: 500, lg: 500, xl: 500 } }}
                        >
                            {activities.map((activity, i) => (
                                <Tab label={activity.title} key={i} {...a11yProps({ i })} />))
                            }

                        </Tabs>
                    </Box>

                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Box sx={{ maxWidth: { xs: 350, sm: 400, md: 600, lg: 850, xl: 1000 } }}>
                            {activityFormVisible && <AddActivityForm dayId={day._id} submitFun={addAnActivity} submitFun2={() => { setActivityFormVisible(false) }} cancelFun={cancelFun} />}

                            {activities.map((activity, i) => (
                                <TabPanel value={tabValue} index={i} key={i}>
                                    {/* <Typography component={'span'}> {activity.title} - {activity.location}</Typography> */}
                                    {/* <Tooltip title="Delete this activity">
                                    <IconButton onClick={() => deleteAnActivity(activity._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip> */}
                                    <Activity activity={activity} showActivity={showActivity} deleteActivity={() => deleteAnActivity(activity._id)} />
                                </TabPanel>
                            ))}
                        </Box>
                    </Grid>

                </Box>


            </Box >
        </Box>
    )
}