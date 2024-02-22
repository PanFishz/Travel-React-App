import './App.css'
import './index.css'
import TripList from './TripList'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  palette: {
    background: {
      default: "darkgrey"
    }
  }
});

function App() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1008px)' })
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1007 })
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  const { auth, setAuth } = useContext(AuthContext)



  async function getIsLoggedin() {
    await axios.get('/user', { withCredentials: true })
      .then(response => {
        setAuth({ id: response.data._id, username: response.data.username })
      })
      .catch(err => {
        console.log('Not Logged In')
      })
  }
  useEffect(() => {
    getIsLoggedin();
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <TripList isMobile={isMobile} />
      </div>
    </ThemeProvider>
  )
}

export default App

// import Register from './Register';
// import Login from './login';

// import Layout from './components/Layout';
// import RequireAuth from './components/RequireAuth';
// import PersistLogin from './PersistLogin';
// import { Routes, Route } from 'react-router-dom';
// import Home from './components/home';

// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

// function App() {

//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {/* public routes */}
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />


//         {/* we want to protect these routes */}
//         <Route element={<PersistLogin />}>
//           <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
//             <Route path="/" element={<Home />} />
//           </Route>
//         </Route>

//       </Route>
//     </Routes>
//   );
// }

// export default App;
