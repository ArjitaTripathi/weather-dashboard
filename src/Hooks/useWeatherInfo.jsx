import { useContext } from "react"
import { WeatherContext } from "../Context/context"
import { convertTemp } from "../constants/functions"


export const useWeatherInfoData = () => {
    const { weatherInfo, tempValue } = useContext(WeatherContext)
    return [
        {
            title: "Min Temperature / Max Temperature",
            value: weatherInfo.main
                ? `${convertTemp(weatherInfo.main.temp_min, tempValue, 0)} °${tempValue} / ${convertTemp(weatherInfo.main.temp_max, tempValue, 0)} °${tempValue}`
                : 'N/A'
        },
        {
            title: "Visibility",
            value: weatherInfo.visibility ? `${(weatherInfo.visibility / 1000).toFixed(2)} km` : 'N/A'
        },
        {
            title: "Feels Like",
            value: weatherInfo.main
                ? `${convertTemp(weatherInfo.main.feels_like, tempValue, 0)} °${tempValue}`
                : 'N/A'
        },
        {
            title: "Sunrise / Sunset",
            value: weatherInfo.sys &&
                `☀️${new Date((weatherInfo.sys.sunrise) * 1000)
                    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
        / 🌙${new Date((weatherInfo.sys.sunset) * 1000)
                    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                || 'N/A'
        }
    ]
}