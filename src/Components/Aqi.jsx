import { useContext, useEffect, useState } from "react"
import { getAirQuality } from "../api"
import { AQI } from "../constants/constants"
import { WeatherContext } from "../Context/context"

export const AirQualityIndex = () => {
    const [aqi, setAqi] = useState(null)
    const aqiLevel = AQI.find(item => item.index === aqi ? item : '')
    const aqiMessage = AQI.find(item => item.index === aqi ? item : '')
    const { cityCoords } = useContext(WeatherContext)


    useEffect(()=>{
        const fetchAirQuality = async () => {
            try {
                const airQuality = await getAirQuality(cityCoords.lat, cityCoords.lon)
                setAqi(airQuality.data?.list?.[0]?.main?.aqi)
            } catch (err) {
                console.error("Failed to fetch air quality:", err)
            }
        }
        fetchAirQuality()
    },[cityCoords])

    return (
        <div className="airQuality lightModeCard">
            <h3>Air Quality</h3>
            <div>
                <div className="aqiLevel">
                    <span>{aqiLevel?.level}</span>
                    <span>{aqi} AQI</span>
                </div>
                <span className="aqiMsg">{aqiMessage?.message}</span>
            </div>
        </div>
    )
}