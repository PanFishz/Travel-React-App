import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Register from './Register';
import Login from './Login';




export default function Authentication() {

    const [loginFormVisible, setLoginFormVisible] = useState(true)

    return (
        <Box sx={{ backgroundColor: 'primary.light', borderRadius: 5, maxWidth: '90vw', minWidth: { xs: '90vw', sm: '55vw', md: '45vw', lg: '30vw', xl: '25vw' } }}>
            <Typography variant='h3' sx={{
                color: '#fff', fontWeight: 'bold', paddingTop: 10
            }}>WanderList</Typography>
            <Box sx={{ paddingBottom: 10, paddingX: '12%' }}>

                <Box>

                    <br />
                    {loginFormVisible && <Login toRegister={() => { setLoginFormVisible(false) }} />
                    }
                    {!loginFormVisible && <Register toLogin={() => setLoginFormVisible(true)} />

                    }


                </Box>
            </Box>
        </Box >
    )

}