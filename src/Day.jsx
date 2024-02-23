import './Day.css';
import AddActivityForm from './AddActivityForm';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from './api/axios';
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



export default function Day({ day, deleteDay, user, setMessage, dayIndex, isOneDay }) {
    const [activityFormVisible, setActivityFormVisible] = useState(false)
    const [activities, setActivities] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [updated, setUpdated] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        setMessage('')
    }, [updated, tabValue, activityFormVisible, activities])

    useEffect(() => {
        axios.get(`/days/${day._id}`, {
            params: { id: day._id },
            withCredentials: true,
        })
            .then(act => {
                if (act.data.activities) setActivities(act.data.activities)
            })
            .catch(err => console.log(err))
    }, [updated])

    const deleteAnActivity = (id) => {
        axios.delete(`/days/${day._id}/activities/${id}`, {
            params: { dayId: day._id, id: id }, withCredentials: true,
        })
            .then(
                activities => {
                    setActivities(activities.data.activities)
                    setTabValue(0)
                })
            .catch(err => console.log(err))
    }

    const addAnActivity = (id, activity) => {
        axios.post(`/days/${id}/addAnActivity`, { id, activity, userId: user }
            , { withCredentials: true, })
            .then(response => {
                setActivities(response.data.day.activities)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const cancelFun = () => {
        setActivityFormVisible(false)
    }


    return (
        <Box className='Day'>
            <Box>

                <Box>
                    <Typography variant='h5' component='div' sx={{ fontWeight: 'bold', color: 'text.main', textShadow: ' 2px 2px 4px grey' }}>
                        Day {dayIndex}
                        <Tooltip title="Delete this day">
                            <span>
                                <IconButton onClick={() => {
                                    setButtonDisabled(true);
                                    deleteDay(day._id);
                                }} disabled={isOneDay ? true : isButtonDisabled} >
                                    <DeleteIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Typography>
                </Box>
                <Box sx={{ display: { sm: 'none' } }}>
                    <Typography sx={{ color: 'textcolor.link' }} component='div'>Activities:

                        <Tooltip title="Add an activity">
                            <IconButton onClick={() => setActivityFormVisible(true)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    {activityFormVisible && <AddActivityForm dayId={day._id} submitFun={addAnActivity} submitFun2={() => { setActivityFormVisible(false) }} cancelFun={cancelFun} />}

                    {activities && activities.map((activity, i) => (
                        <Accordion key={i} onClick={() => setMessage('')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel-content"
                                id={i}
                                sx={{ color: 'textcolor.light' }}
                            >
                                {activity.title} - {activity.location}
                            </AccordionSummary>
                            <AccordionDetails>

                                <Activity
                                    activity={activity}
                                    user={user}
                                    deleteActivity={() => deleteAnActivity(activity._id)}
                                    setUpdated={() => setUpdated(!updated)}
                                    setMessage={setMessage} />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}>
                        {activities.length !== 0 && <Tabs
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            value={tabValue}
                            onChange={handleChange}
                            aria-label="activities tabs"

                        >
                            {activities && activities.map((activity, i) => (
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
                        sx={{ flexGrow: 1, display: 'flex' }}
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
                                aria-label="Vertical activities tabs"
                                sx={{ borderRight: 1, borderColor: 'divider', maxHeight: { xs: 350, sm: 400, md: 500, lg: 500, xl: 500 } }}
                            >
                                {activities && activities.map((activity, i) => (
                                    <Tab label={activity.title} key={i} {...a11yProps({ i })} sx={{ color: 'textcolor.lightest' }} />))
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

                                {activities && activities.map((activity, i) => (
                                    <TabPanel value={tabValue} index={i} key={i}>
                                        <Activity activity={activity} user={user} deleteActivity={() => deleteAnActivity(activity._id)} setUpdated={() => setUpdated(!updated)} setMessage={setMessage} />
                                    </TabPanel>
                                ))}
                            </Box>
                        </Grid>

                    </Box>


                </Box >
            </Box>
        </Box >
    )
}