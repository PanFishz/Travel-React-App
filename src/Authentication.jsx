import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Register from './Register';
import Login from './Login';



export default function Authentication({ setCookie }) {

    const [loginFormVisible, setLoginFormVisible] = useState(true)

    return (
        <>
            <Typography variant='h2' sx={{ color: 'secondary.main' }}>TravelApp</Typography>
            <br />
            <Box>
                {loginFormVisible && <Login toRegister={() => { setLoginFormVisible(false) }} setCookie={setCookie} />
                }
                {!loginFormVisible && <Register toLogin={() => setLoginFormVisible(true)} setCookie={setCookie} />

                }


            </Box>


        </>

    )

}