import React, { useContext } from 'react'
import SearchBar from './SearchBar'
import { WeatherContext } from '../Context/context'

const Header = () => {
    const {setTempValue} = useContext(WeatherContext)
    return (
        <div className="header lightModeCard">
            <div className="headerTitle">
                <span className="weatherEmoji">
                    &#9925;
                </span>
                <h2>WeatherPro</h2>
            </div>
            <SearchBar />
            <span className="tempScale">
                <span onClick={() => setTempValue('C')}>&deg;C </span>
                / 
                <span onClick={() => setTempValue('F')}>&nbsp;&deg;F</span>
            </span>
        </div>
    )
}

export default Header