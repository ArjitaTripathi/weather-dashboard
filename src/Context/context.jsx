import { createContext, useMemo, useState } from "react";

export const WeatherContext = createContext(null);

export const WeatherProvider = ({children}) => {
    const [city, setCity] = useState('')
    const [cityCoords, setCityCoords] = useState({lat: null, lon: null})
    const [weatherInfo, setWeatherInfo] = useState({})
    const [tempValue, setTempValue] = useState('C')

    const contextValue = useMemo(() => ({
        city,setCity,
        cityCoords, setCityCoords,
        weatherInfo, setWeatherInfo,
        tempValue, setTempValue,
    }),[city, weatherInfo, cityCoords, tempValue])

    return(
      <WeatherContext.Provider value={contextValue}>  
        {children}
      </WeatherContext.Provider>
    )
  }