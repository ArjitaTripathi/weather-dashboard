import React, { useContext, useEffect } from "react"
import { WeatherContext } from "../Context/context"
import { updateWeatherInfo } from "../api"
import { daysOfWeek, options } from "../constants/constants"
import { getLocalTime, convertTemp, getIconUrl } from "../constants/functions"
import { Forecast } from "./Forecast"
import { AirQualityIndex } from "./Aqi"


const MainContent = ({ defaultCoords }) => {
    const { weatherInfo, tempValue, setWeatherInfo, cityCoords, setCityCoords, city, setCity } = useContext(WeatherContext)
    const description = weatherInfo.weather ? weatherInfo.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : ''
    
    const cityDate = (weatherInfo?.dt && weatherInfo?.timezone)
        ? getLocalTime(weatherInfo.dt, weatherInfo.timezone)
        : null

    const currentDay = cityDate ? daysOfWeek[cityDate.getUTCDay()] : daysOfWeek[new Date().getDay()]
    const currentDate = cityDate
        ? cityDate.toLocaleString("en-US", { ...options, timeZone: "UTC" })
        : new Date().toLocaleString("en-US", options)
    const localTime = cityDate
        ? cityDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })
        : "--"
    const utcTime = weatherInfo?.dt ? new Date(weatherInfo.dt * 1000) : null

    const tempC = convertTemp(weatherInfo.main?.temp, "C", 0);
    const tempF = convertTemp(weatherInfo.main?.temp, "F", 0);

    useEffect(() => {
        setCityCoords({
            lat: defaultCoords?.lat,
            lon: defaultCoords?.lon
        })
    }, [defaultCoords])


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (!cityCoords.lat || !cityCoords.lon) return
                const weatherData = await updateWeatherInfo(cityCoords.lat, cityCoords.lon)
                setWeatherInfo(weatherData.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWeather()
    }, [cityCoords])


    return (
        <div className="mainContent">
            <div className="cityWeather lightModeCard">
                <h1 className="cityName">📍 {city ? city : `${weatherInfo.name}, ${weatherInfo.sys?.country}`}</h1>
                <div className="DateTimeValues">
                    <span>{`${currentDay}, ${currentDate}`}</span>
                    <div className="time">
                        <div className="timeItem">
                            <span>Local Time </span>
                            <span>{localTime}</span>
                        </div>
                        <div className="timeItem">
                            <span>UTC Time </span>
                            <span>{utcTime ? utcTime.toUTCString() : "--"}</span>
                        </div>
                    </div>
                </div>
                <div className="tempAndIcon">
                    <h1 className="temp">{tempValue === 'C' ? tempC : tempF}&deg;{tempValue}</h1>
                    <img src={getIconUrl(weatherInfo?.weather?.[0]?.icon)} alt={weatherInfo.weather?.[0].description} />
                </div>
                <h2>{description}</h2>
                <div className="additionalInfo">
                    <div className="info">{weatherInfo.main?.humidity}% <span>Humidity</span></div>
                    <div className="info">{(weatherInfo.wind?.speed * 3.6).toFixed(2)} km/h <span>Wind Speed</span></div>
                    <div className="info">{weatherInfo.main?.pressure} hPa <span>Pressure</span></div>
                </div>
            </div>
            <div className="otherInfo">
                <Forecast />
                <AirQualityIndex />
            </div>
        </div>
    )
}

export default MainContent