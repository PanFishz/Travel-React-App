import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';


const Login = ({ toRegister }) => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [showPwd, setShowPwd] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login',
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                    , withCredentials: true,
                }
            );
            const id = response?.data._id
            const username = response?.data.username
            setAuth({ username, id });
            setUser('');
            setPwd('');


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Incorrect Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Typography variant='h4'>Sign In</Typography>
            <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="username" sx={{ color: 'textcolor.main' }}>Username:</InputLabel>
                <Input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    disableUnderline={true}
                    fullWidth={true}

                />

                <InputLabel htmlFor="password" sx={{ color: 'textcolor.main' }}>Password:</InputLabel>
                <Input
                    id="password"
                    type={showPwd ? 'text' : 'password'}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    disableUnderline={true}
                    fullWidth={true}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPwd((show) => !show)}
                                edge="end"
                                sx={{ color: 'textcolor.icon' }}
                            >
                                {showPwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>}
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line" onClick={toRegister} >
                    Sign Up
                </span>
            </p>
        </section>
    )
}

export default Login
