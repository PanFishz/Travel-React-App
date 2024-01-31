import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import FormInput from "./components/FormInput";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import axios from "axios";
import Register from './Register';
import Login from './login';



export default function Authentication({ submitFun, setCookie }) {
    const [user, setUser] = useState('');

    const [formData, setFormData] = useState({ username: "", email: "", password: "" })
    const [loginFormVisible, setLoginFormVisible] = useState(true)
    const { auth } = useContext(AuthContext)


    const inputs = [{
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "Email must not be empty",
        label: "Email",
        required: true

    }, {
        id: 2,
        name: "username",
        type: "text",
        placeholder: "Username",
        errorMessage: "Username must not be empty",
        label: "Username",
        required: true
    }, {
        id: 3,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage: "Password must not be empty",
        label: "Password",
        required: true
    }]



    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/login', { username: formData.username, password: formData.password })
            .then(response => {
                console.log(response.data);
            }
            )
            .catch(function (error) {
                console.log("ppnmmmmmmmmmmm", error);
            });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/register', { email: formData.email, username: formData.username, password: formData.password })
            .then(response => {
                console.log(response.data);
            }
            )
            .catch(function (error) {
                console.log("ppnmnnn", error);
            });
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Typography variant='h2' sx={{ color: 'secondary.main' }}>TravelApp</Typography>
            <br />
            {!user && <Box>
                {loginFormVisible && <Login toRegister={() => { setLoginFormVisible(false) }} setCookie={setCookie} />

                    // <form onSubmit={handleSubmit}>
                    //     {inputs.map((input, i) => {
                    //         if (i !== 0) return (
                    //             <FormInput
                    //                 key={input.id}
                    //                 {...input}
                    //                 value={formData[input.name]}
                    //                 onChange={onChange}
                    //             />)

                    //     })}
                    //     <button>Log in</button>
                    //     <Typography compoment='span' sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setLoginFormVisible(false)}>Register</Typography>
                    // </form>
                }
                {!loginFormVisible && <Register toLogin={() => setLoginFormVisible(true)} setCookie={setCookie} />
                    // <form onSubmit={handleRegister}>
                    //     {inputs.map((input) => (
                    //         <FormInput
                    //             key={input.id}
                    //             {...input}
                    //             value={formData[input.name]}
                    //             onChange={onChange}
                    //         />
                    //     ))}
                    //     <button>Register</button>
                    //     <Typography compoment='span' sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setLoginFormVisible(true)}>Login</Typography>

                    //     {/* <button type="button" onClick={cancelFun}>Cancel</button> */}
                    // </form>
                }


            </Box>
            }

        </>

    )

}