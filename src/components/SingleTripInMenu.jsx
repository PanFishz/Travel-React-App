import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';




export default function SingleTripInMenu({ trip, selectFun }) {


    return (
        <ListItem disablePadding className="SingleTripInMenu">
            <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={trip.destination} onClick={() => { selectFun(trip._id) }} sx={{ color: 'secondary.main' }} />
            </ListItemButton>

        </ListItem>
    )
}