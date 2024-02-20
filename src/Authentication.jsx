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
        <ThemeProvider theme={theme}>
            {/* {console.log("pppp", isLoggedIn)}
            {isLoggedIn && <Navigate to="/mytrip" replace />}

            {!isLoggedIn && */}
            <Box sx={{ backgroundColor: 'primary.light', borderRadius: 5 }}>
                <Box sx={{ padding: 10 }}>
                    <Typography variant='h2' sx={{ color: '#fff', fontWeight: 'bold' }}>WanderList</Typography>
                    <br />
                    <Box>
                        {loginFormVisible && <Login toRegister={() => { setLoginFormVisible(false) }} />
                        }
                        {!loginFormVisible && <Register toLogin={() => setLoginFormVisible(true)} />

                        }


                    </Box>
                </Box>
            </Box>
            {/* } */}


        </ThemeProvider>


    )

}