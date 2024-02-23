import './App.css'
import './index.css'
import TripList from './TripList'
//import { useMediaQuery } from 'react-responsive'

import { useEffect, useContext, useMemo } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { pink, amber, grey, cyan } from '@mui/material/colors';


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...cyan,
      ...(mode === 'dark' && {
        main: cyan[200],
        paper: cyan[900],
      }),
      ...(mode === 'light' && {
        main: cyan[400],
        paper: cyan[700],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        // default: amber[300],
        // paper: amber[300],
        main: cyan[300],
        paper: cyan[300],
        default: cyan[300],
      },
      textcolor: {
        lightest: grey[300],
        light: grey[700],
        main: grey[800],
        dark: grey[900],
        special: '#fff',
        link: '#fff',
      },
    }),
    ...(mode === 'light' && {
      background: {
        main: cyan[300],
        paper: cyan[300],
        default: cyan[300],
      },
      textcolor: {
        lightest: grey[600],
        light: grey[600],
        main: grey[700],
        dark: grey[800],
        special: '#fff',
        link: grey[700],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[800],
          secondary: grey[700],
        }
        : {
          primary: '#fff',
          secondary: grey[900],
        }),
    },
  },
});


function App() {
  // const isDesktop = useMediaQuery({ query: '(min-width: 1008px)' })
  // const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1007 })
  // const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  const { setAuth } = useContext(AuthContext)
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode: prefersDarkMode ? 'dark' : 'light',
  //       },
  //     }),
  //   [prefersDarkMode],
  // );
  const theme = useTheme();
  const darkModeTheme = createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light'));

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
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <ThemeProvider theme={darkModeTheme}>
      <div className="App">
        <TripList isMobile={null} />
      </div>
      {/* </ThemeProvider> */}
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
