import { useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { fetchCityResults } from '../api'
import { WeatherContext } from '../Context/context'


const SearchBar = () => {
  const {setCity, setCityCoords} = useContext(WeatherContext)
  const [citiesList, setCitiesList] = useState([])
  const [showCitiesList, setShowCitiesList] = useState(true)
  const [userInput, setUserInput] = useState('')
  const inputRef = useRef(null)
  const [dropdownStyle, setDropdownStyle] = useState({})


  const handleInputChange = (e) => {
    setUserInput(e.target.value)
    setShowCitiesList(true)
    if(e.target.value === '') {
      setShowCitiesList(false)
    }
  }

  useEffect(() => {
    const getCitiesList = async() => {
      try{
        if(userInput === '') {
          setCitiesList([])
          return
        }
        const res = await fetchCityResults(userInput)
        if(res.data.length > 0) {
          setCitiesList(res.data)
        }
        else{
          setCitiesList([])
        }
      }catch(err){
        console.log(err)
      }
    }
    const id = setTimeout(getCitiesList, 250)
    return () => clearTimeout(id)
  },[userInput])
  
  useEffect(() => {
    const updatePosition = () => {
      if (!inputRef.current) return
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'fixed',
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 10000 
      })
    }
    if (showCitiesList && citiesList.length > 0) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [showCitiesList, citiesList])

  const handleClickCityName = async(cityObj) => {
    setUserInput(`${cityObj.name}, ${cityObj.state ? `${cityObj.state}, ` : ''}${cityObj.country}`)
    setCity(`${cityObj.name}, ${cityObj.state ? `${cityObj.state}, ` : ''}${cityObj.country}`)
    setShowCitiesList(false)
    setCityCoords({ lat: cityObj.lat, lon: cityObj.lon }) 
  }

  return (
    <div className="searchbar">
      <input
        ref={inputRef}
        type="text"
        className="lightModeCard searchInput"
        placeholder="Search for a city..."
        value={userInput}
        onChange={handleInputChange}
        onFocus={() => {if(citiesList.length > 0) setShowCitiesList(true)}}
      />
      {citiesList.length > 0 && showCitiesList && createPortal(
        (
          <ul className="suggestionsList lightModeCard" style={dropdownStyle}>
            {citiesList.map((cityObj, index) => (
              <li key={index} className="suggestionItem" onClick={() => handleClickCityName(cityObj)}>
                {cityObj.name}, {cityObj.state ? `${cityObj.state}, ` : ''}{cityObj.country}
              </li>
            ))}
          </ul>
        ),
        document.body
      )}
    </div>
  )
}

export default SearchBar