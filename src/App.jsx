import { useEffect, useState, useContext } from 'react'
import './App.css'
import Header from './Components/Header'
import MainContent from './Components/MainContent'
import WeatherTab from './Components/WeatherTab'
import { useWeatherInfoData } from './Hooks/useWeatherInfo'
import {getLocalTime, getTimeOfDay} from './constants/functions'
import { updateWeatherInfo } from './api'
import { WeatherContext } from './Context/context'


function App() {

  const weatherInfo = useWeatherInfoData()
  const { weatherInfo: currentCityWeather } = useContext(WeatherContext)
  
  const [localTime, setLocalTime] = useState(null)
  const [defaultCoords, setDefaultCoords] = useState({
    lat: null,
    lon: null
  })
        
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setDefaultCoords({
            lat: lat,
            lon:lon
          })
        
        },
        (error) => {
          alert('Enable the location.')
          console.error('Error getting location:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,        
          maximumAge: 0             
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, [])

  useEffect(() => { 
    if (defaultCoords.lat && defaultCoords.lon) {
      const fetchWeather = async () => {
        try {
          const { data } = await updateWeatherInfo(defaultCoords.lat, defaultCoords.lon);
          const date = getLocalTime(data.dt, data.timezone)
          setLocalTime(getTimeOfDay(date.getUTCHours()))
        } catch (err) {
          console.error("Failed to fetch weather info:", err);
        }
      };
    
      fetchWeather();
    }
  }, [defaultCoords])

  useEffect(() => {
    if (currentCityWeather?.dt && currentCityWeather?.timezone) {
      const date = getLocalTime(currentCityWeather.dt, currentCityWeather.timezone)
      if (date) {
        setLocalTime(getTimeOfDay(date.getUTCHours()))
      }
    }
  }, [currentCityWeather])


  return (
    <div className={`container ${localTime === 'morning' || localTime === 'afternoon' ? 'morningBackground' : 'nightBackground'}`}>
      <div className="innerContainer">
        <Header />
        <MainContent defaultCoords={defaultCoords}/>
        <div className="weatherInfo">
          {weatherInfo
            .map((info, index) => (
              <WeatherTab key={index} title={info.title} value={info.value}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default App
