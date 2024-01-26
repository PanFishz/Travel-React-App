import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 340;
const navItems = ['About', 'Contact'];



function DrawerAppBar(props) {
    const { window, addATrip, getTripList, unfocusTrips, cancelAddTrip, trip } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tripListOpen, setTripListOpen] = useState(false);
    const [bigTripListOpen, setBigTripListOpen] = useState(false);

    const handleDrawerToggle = () => {
        setTripListOpen(false)
        setMobileOpen((prevState) => !prevState);
    };

    const handleTripClick = () => {
        cancelAddTrip()
        setMobileOpen(false)
        setBigTripListOpen(false)
        setTripListOpen(false)

    }




    const tripDrawer = (
        <>
            <Divider />
            <List onClick={handleTripClick}>
                <ListItem disablePadding className="SingleTripInMenu">
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary="All Trips" sx={{ color: 'primary.main' }} onClick={unfocusTrips} />
                    </ListItemButton>
                </ListItem>
                {getTripList()}
            </List>
            <Divider />
        </>
    )

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={() => { unfocusTrips(); handleDrawerToggle() }}>
                TravelApp
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary="Trips" onClick={() => setTripListOpen(true)} />
                    </ListItemButton>
                </ListItem>
                {tripListOpen && tripDrawer}

                <ListItem disablePadding onClick={handleDrawerToggle}>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={addATrip}>
                        <ListItemText primary="+Trip" />
                    </ListItemButton>
                </ListItem>

                {navItems.map((item) => (
                    <ListItem key={item} disablePadding onClick={handleDrawerToggle}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ bgcolor: 'secondary.main' }}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {trip && <Typography component={'span'} sx={{ display: { sm: 'none' } }}>{trip}</Typography>}
                    <Typography

                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        textAlign="left"

                    >
                        <Typography component={'span'} variant="h6" onClick={unfocusTrips}>TravelApp</Typography> {trip && <Typography component={'span'} textAlign="left">/ {trip}</Typography>}

                    </Typography>


                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button sx={{ color: '#fff' }} onClick={() => setBigTripListOpen(true)}>
                            Trips
                        </Button>
                        <Button sx={{ color: '#fff' }} onClick={addATrip}>
                            +Trip
                        </Button>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }} >
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Drawer
                container={container}
                variant="temporary"
                open={bigTripListOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {tripDrawer}
            </Drawer>


        </Box>
    );
}


export default DrawerAppBar;
