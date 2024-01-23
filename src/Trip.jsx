import './Trip.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditDestinationForm from './EditDestinationForm';


export default function Trip({ trip, deleteFun, selectFun, editDestinationFun }) {
    const [editDestinationForm, setEditDestinationForm] = useState(false)

    const handleCleanUp = () => {
        setEditDestinationForm(false);
    }

    return (<div className="Trip" key={trip._id}>
        <div >
            <span onClick={() => selectFun(trip._id)}>Destination: {trip.destination}</span>
            {!editDestinationForm && <EditIcon onClick={() => { setEditDestinationForm(true) }} />}
            {editDestinationForm && <EditDestinationForm submitFun={editDestinationFun} destination={trip.destination} id={trip._id} cleanup={handleCleanUp} />}
        </div>
        <div> Duration: {trip.duration} days!!!</div>
        <DeleteIcon onClick={() => deleteFun(trip._id)} />
    </div>)
}