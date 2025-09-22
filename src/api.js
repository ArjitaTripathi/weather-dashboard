import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const endpoint = import.meta.env.VITE_APP_ENDPOINT;

export const fetchCityResults = async (query) => {
    const response = await axios.get(`${endpoint}/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
    return response
}

export const updateWeatherInfo = async (lat, lon) => {
    const response = await axios.get(`${endpoint}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return response
}

export const weatherForecast = async (lat, lon) => {
    const response = await axios.get(`${endpoint}/data/2.5/forecast?limit=5&lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    return response.data
}

export const getAirQuality = async (lat, lon) => {
    const response = await axios.get(`${endpoint}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return response
}