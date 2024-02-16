import './Trip.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditDestinationForm from './EditDestinationForm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';



export default function Trip({ trip, deleteFun, selectFun, editDestinationFun, cancelAddFun, setMessage }) {
    const [editDestinationForm, setEditDestinationForm] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const handleCleanUp = () => {
        cancelAddFun()
        setEditDestinationForm(false);
    }

    return (
        <Card className="Trip" variant="outlined" key={trip._id} onClick={() => { setMessage('') }} >
            <CardContent >
                <Typography onClick={() => selectFun(trip._id)} sx={{ fontSize: 22, display: 'inline' }} >
                    {trip.destination}
                </Typography>

                {!editDestinationForm && <EditIcon onClick={() => { setEditDestinationForm(true) }} display="inline" />}

                {editDestinationForm &&
                    <EditDestinationForm submitFun={editDestinationFun} destination={trip.destination} id={trip._id} cleanup={handleCleanUp} />}

                <Typography > {trip.duration} {trip.duration === 1 ? "day" : "days"}</Typography>
                <Tooltip title="Delete this trip">
                    <IconButton onClick={() => {
                        setButtonDisabled(true);
                        deleteFun(trip._id);
                    }} disabled={isButtonDisabled} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

            </CardContent>
        </Card>)
}