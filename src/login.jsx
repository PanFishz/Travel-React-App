import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';


const Login = ({ toRegister, setCookie }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');


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
            //console.log((response), response?.data._id);

            setAuth({ username, id });
            setCookie('id', response?.data._id)
            setCookie('username', response?.data.username)
            setUser('');
            setPwd('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line" onClick={toRegister} >
                        {/*put router link here*/}
                        Sign Up
                    </span>
                </p>
            </section>
        </>
    )
}

export default Login
