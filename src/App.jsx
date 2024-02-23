import './App.css'
import './index.css'
import TripList from './TripList'
import { useEffect, useContext, useMemo } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import getDesignTokens from './components/getDesignTokens';




function App() {
  // const isDesktop = useMediaQuery({ query: '(min-width: 1008px)' })
  // const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1007 })
  // const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  const { auth, setAuth } = useContext(AuthContext)
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');



  const darkModeTheme = createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light'));

  async function getIsLoggedin() {
    await axios.get('/user', { withCredentials: true })
      .then(response => {
        setAuth({ id: response.data._id, username: response.data.username })
      })
      .catch(err => {
        console.log('Login Required')
      })
  }

  useEffect(() => {
    getIsLoggedin();
  }, [])


  return (

    <ThemeProvider theme={darkModeTheme}>
      <div className="App">
        <TripList isMobile={null} />
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
