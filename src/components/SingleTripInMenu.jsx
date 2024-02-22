import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../Day.css'

import { ThemeProvider } from '@mui/system';
import theme from './ColorPalette';


export default function SingleTripInMenu({ trip, selectFun }) {


    return (
        <ThemeProvider theme={theme}>
            <ListItem disablePadding className="SingleTripInMenu">
                <ListItemButton sx={{ textAlign: 'center', backgroundColor: 'background.light' }}>
                    <ListItemText primary={trip.destination} onClick={() => { selectFun(trip._id) }} sx={{ color: 'background.dark' }} />
                </ListItemButton>

            </ListItem>
        </ThemeProvider>
    )
}