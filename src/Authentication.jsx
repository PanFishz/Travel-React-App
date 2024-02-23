import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Register from './Register';
import Login from './Login';
import theme from './components/ColorPalette'
import { ThemeProvider } from '@emotion/react';



export default function Authentication() {

    const [loginFormVisible, setLoginFormVisible] = useState(true)

    return (
        // <ThemeProvider theme={theme}>

        // {isLoggedIn && <Navigate to="/mytrip" replace />}

        // {!isLoggedIn && */}
        <Box sx={{ backgroundColor: 'primary.light', borderRadius: 5, maxWidth: '90vw' }}>
            <Typography variant='h3' sx={{
                color: '#fff', fontWeight: 'bold', paddingTop: 10
            }}>WanderList</Typography>
            <Box sx={{ paddingBottom: 10, paddingX: 10 }}>

                <Box>

                    <br />
                    {loginFormVisible && <Login toRegister={() => { setLoginFormVisible(false) }} />
                    }
                    {!loginFormVisible && <Register toLogin={() => setLoginFormVisible(true)} />

                    }


                </Box>
            </Box>
        </Box>
        // {/* } */}


        // </ThemeProvider>


    )

}