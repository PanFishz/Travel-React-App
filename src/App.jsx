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
  const { auth, setAuth } = useContext(AuthContext)
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

