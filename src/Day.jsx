import './Day.css';
import AddActivityForm from './AddActivityForm';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Day({ day, showActivity, deleteDay }) {
    const [activityFormVisible, setActivityFormVisible] = useState(false)
    const [activities, setActivities] = useState([])

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


    return (
        <div className="Day" >
            <div>Day {day.day} <DeleteIcon onClick={() => { deleteDay(day._id) }} /></div>
            {activities.map(activity => {
                return (
                    <div key={activity._id}>
                        <span onClick={() => { showActivity(activity) }}>{activity.title} - {activity.location}</span>
                        <DeleteIcon onClick={() => { deleteAnActivity(activity._id) }} />
                    </div>
                )
            })}
            {!activityFormVisible && <AddIcon onClick={() => setActivityFormVisible(true)} />}
            {activityFormVisible && <div><AddActivityForm dayId={day._id} submitFun={addAnActivity} submitFun2={() => { setActivityFormVisible(false) }} /></div>}
        </div>
    )
}