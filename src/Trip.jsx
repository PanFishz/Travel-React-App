import './Trip.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditDestinationForm from './EditDestinationForm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';




export default function Trip({ trip, deleteFun, selectFun, editDestinationFun, cancelAddFun }) {
    const [editDestinationForm, setEditDestinationForm] = useState(false)

    const handleCleanUp = () => {
        cancelAddFun()
        setEditDestinationForm(false);
    }

    return (
        <Card className="Trip" variant="outlined" key={trip._id}>
            <CardContent >
                <Typography onClick={() => selectFun(trip._id)} sx={{ fontSize: 22, display: 'inline' }} >
                    {trip.destination}
                </Typography>

                {!editDestinationForm && <EditIcon onClick={() => { setEditDestinationForm(true) }} display="inline" />}

                {editDestinationForm &&
                    <EditDestinationForm submitFun={editDestinationFun} destination={trip.destination} id={trip._id} cleanup={handleCleanUp} />}

                <Typography > {trip.duration} {trip.duration === 1 ? "day" : "days"}</Typography>
                <DeleteIcon onClick={() => deleteFun(trip._id)} />
            </CardContent>
        </Card>)
}