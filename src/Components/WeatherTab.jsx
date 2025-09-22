import React from 'react'

const WeatherTab = ({title, value}) => {
  return (
    <div className="card lightModeCard">
      <h3 className="cardHeading">{title}</h3>
      <span className="stats">{value}</span>
    </div>
  )
}

export default WeatherTab