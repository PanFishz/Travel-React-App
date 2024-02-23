import { useState, useContext } from 'react';
import { ThemeProvider } from '@mui/system';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext from "../context/AuthProvider";
import theme from './ColorPalette'

const drawerWidth = 340;
const navItems = []
//['About', 'Contact'];



function DrawerAppBar(props) {
    const { window, addATrip, getTripList, unfocusTrips, cancelAddTrip, trip, logout, user, setMessage } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tripListOpen, setTripListOpen] = useState(false);
    const [bigTripListOpen, setBigTripListOpen] = useState(false);
    const { auth } = useContext(AuthContext)

    const handleDrawerToggle = () => {
        setTripListOpen(false)
        setMessage('')
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
            {/* <ThemeProvider theme={theme}>
                <CssBaseline /> */}
            <Divider />
            <List onClick={handleTripClick}>
                <ListItem disablePadding className="SingleTripInMenu">
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary="All Trips" sx={{ color: 'textcolor.special' }} onClick={unfocusTrips} />
                    </ListItemButton>
                </ListItem>
                {getTripList()}
            </List>
            <Divider />
            {/* </ThemeProvider> */}
        </>
    )

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={() => { unfocusTrips(); handleDrawerToggle() }}>
                WanderList
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={tripListOpen ? <>Trips<KeyboardArrowUpIcon /></> : <>Trips<KeyboardArrowDownIcon /></>} onClick={() => setTripListOpen(!tripListOpen)} />
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
                <ListItem disablePadding onClick={handleDrawerToggle}>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={logout}>
                        <ListItemText primary={<>{user}/Logout</>} />
                    </ListItemButton>
                </ListItem>


            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline />
            <ThemeProvider theme={theme}> */}
            <AppBar component="nav" sx={{ bgcolor: 'background.main' }}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: 'textcolor.main' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {trip && <Typography component={'span'} sx={{ display: { sm: 'none' }, color: 'textcolor.main' }}>{trip}</Typography>}
                    <Typography

                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'textcolor.main', fontWeight: 'bold' }}
                        textAlign="left"

                    >
                        <Typography component={'span'} variant="h6" onClick={unfocusTrips}>WanderList</Typography> {trip && <Typography component={'span'} textAlign="left" variant='h6' sx={{ fontWeight: 'bold', color: 'background.default', textShadow: ' 2px 2px 4px grey', display: { xs: 'block', sm: 'none' } }}>/ {trip}</Typography>}

                    </Typography>


                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button sx={{ color: 'textcolor.main' }} onClick={() => { setBigTripListOpen(true); setMessage('') }}>
                            Trips
                        </Button>
                        <Button sx={{ color: 'textcolor.main' }} onClick={addATrip}>
                            +Trip
                        </Button>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: 'textcolor.main' }} onClick={() => { setMessage('') }} >
                                {item}
                            </Button>
                        ))}
                        <Button sx={{ color: '#fff' }} onClick={logout}>
                            {user}/Logout
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>
            {/* </ThemeProvider> */}
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
                onClose={() => setBigTripListOpen(false)}
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
