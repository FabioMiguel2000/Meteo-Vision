import './App.css'
import WeatherContainer from './components/WeatherContainer/WeatherContainer'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <div className='flex-grow flex items-center justify-center'>
        <WeatherContainer />
      </div>
    </div>
  )
}

export default App
