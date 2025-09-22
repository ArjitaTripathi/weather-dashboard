// import React from "react"
// import { getIconUrl } from "../constants/functions"

// export const Forecast = ({tempValue}) => {
//     const [forecast, setForecast] = useState({})
//     const [forecastDetails, setForecastDetails] = useState([{
//         day: "",
//         min_temp: "",
//         max_temp: "",
//         icon: "",
//     }])

//     const forcastRes = await weatherForecast(cityCoords.lat, cityCoords.lon)
//     setForecast(groupForecastData(forcastRes?.list))
//     useEffect(() => {
//             if (Object.keys(forecast).length > 0) {
//                 const details = Object.keys(forecast).map(date => {
//                     const data = forecast[date]
//                     const currentDate = new Date().toISOString().split('T')[0]
//                     const tempData = Math.floor(data.length / 2)
//                     const rawMin = data[tempData]?.main?.temp_min
//                     const rawMax = data[tempData]?.main?.temp_max
//                     console.log(rawMin, rawMax, "raw:-")
//                     const tempMin = convertTemperature(rawMin, 'C', tempValue, 0)
//                     const tempMax = convertTemperature(rawMax, 'C', tempValue, 0)
    
//                     const day = currentDate === date ? "Today"
//                         : date === new Date(Date.now() + 86400000).toISOString().split('T')[0]
//                             ? "Tomorrow"
//                             : daysOfWeek[new Date(date).getDay()]
//                     return {
//                         day: day,
//                         min_temp: tempMin,
//                         max_temp: tempMax,
//                         icon: data[tempData]?.weather?.[0]?.icon,
//                     }
//                 })
//                 setForecastDetails(details)
//             }
//         }, [forecast, tempValue])
//         const groupForecastData = (data) => {
//                 const res = data.reduce((acc, curr) => {
//                     const forecastDate = curr.dt_txt.split(' ')[0]
//                     if (!acc[forecastDate]) {
//                         acc[forecastDate] = [curr]
//                     } else {
//                         acc[forecastDate] = [...acc[forecastDate], curr]
//                     }
//                     return acc
//                 }, {})
//                 return res
//             }
        
//     return (
//         <div className="forecast lightModeCard">
//             <h3>5 Days Forecast</h3>
//             {forecastDetails && forecastDetails.map((item, index) => (
//                 index < 5 && (
//                     <React.Fragment key={index}>
//                         <div>
//                             <span>{item.day}</span>
//                             <span className="tempWithIcon">
//                                 <img src={getIconUrl(item.icon)} alt={item.description} />
//                                 {` ${item.min_temp}°${tempValue} / ${item.max_temp}°${tempValue}`}
//                             </span>
//                         </div>
//                         {index < 4 && <hr />}
//                     </React.Fragment>
//                 )
//             ))}
//         </div>
//     )
// }

import React, { useEffect, useState, useContext } from "react"
import { getIconUrl, convertTemperature } from "../constants/functions"
import { daysOfWeek } from "../constants/constants"
import { weatherForecast } from "../api"
import { WeatherContext } from "../Context/context"

export const Forecast = () => {
  const { cityCoords, tempValue } = useContext(WeatherContext)
  const [forecast, setForecast] = useState({})
  const [forecastDetails, setForecastDetails] = useState([])

  const groupForecastData = (data) => {
    return data.reduce((acc, curr) => {
      const forecastDate = curr.dt_txt.split(" ")[0]
      if (!acc[forecastDate]) acc[forecastDate] = [curr]
      else acc[forecastDate].push(curr)
      return acc
    }, {})
  }

  useEffect(() => {
    const fetchForecast = async () => {
      if (!cityCoords.lat || !cityCoords.lon) return
      try {
        const res = await weatherForecast(cityCoords.lat, cityCoords.lon)
        setForecast(groupForecastData(res?.list || []))
      } catch (err) {
        console.error("Error fetching forecast:", err)
      }
    }
    fetchForecast()
  }, [cityCoords])

  useEffect(() => {
    if (Object.keys(forecast).length === 0) return

    const details = Object.keys(forecast).map((date) => {
      const data = forecast[date]
      const currentDate = new Date().toISOString().split("T")[0]
      const tempData = Math.floor(data.length / 2)

      const rawMin = data[tempData]?.main?.temp_min
      const rawMax = data[tempData]?.main?.temp_max
      const tempMin = convertTemperature(rawMin, "C", tempValue, 0)
      const tempMax = convertTemperature(rawMax, "C", tempValue, 0)

      const day =
        currentDate === date
          ? "Today"
          : date === new Date(Date.now() + 86400000).toISOString().split("T")[0]
          ? "Tomorrow"
          : daysOfWeek[new Date(date).getDay()]

      return {
        day,
        min_temp: tempMin,
        max_temp: tempMax,
        icon: data[tempData]?.weather?.[0]?.icon,
      }
    })

    setForecastDetails(details)
  }, [forecast, tempValue])

  return (
    <div className="forecast lightModeCard">
      <h3>5 Days Forecast</h3>
      {forecastDetails.slice(0, 5).map((item, index) => (
        <React.Fragment key={index}>
          <div>
            <span>{item.day}</span>
            <span className="tempWithIcon">
              <img src={getIconUrl(item.icon)} alt={item.day} />
              {` ${item.min_temp}°${tempValue} / ${item.max_temp}°${tempValue}`}
            </span>
          </div>
          {index < 4 && <hr />}
        </React.Fragment>
      ))}
    </div>
  )
}
