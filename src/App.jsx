import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TripList from './TripList'
import { useMediaQuery } from 'react-responsive'


function App() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1008px)' })
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1007 })
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })



  return (

    <main className="App">
      <TripList isMobile={isMobile} />

    </main>

  )
}

export default App
