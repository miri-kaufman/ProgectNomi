import React, { useState } from 'react';
import WeatherCard from "./WeatherCard";
import { getHistoryWeather } from '../services/weatherService.jsx';
import '../styles/style.css';
import logo from '../assets/logo.svg';

const CitySearch = () => {
    const [inputValue, setInputValue] = useState('');
    const [historyData, setHistoryData] = useState(null);
    const [yesterday, setYesterday] = useState(null);
    const [tomorrow, setTomorrow] = useState(null);
    const [error, setError] = useState(null);
   const [showWeatherCard,setShowWeatherCard]=useState(false);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        const validInputPattern = /^[a-zA-Z\s]+$/; // Only allows English letters and spaces
        if (!inputValue) {
            setError("Please enter a city");
            setHistoryData(null);
            return;
        }
        if (!validInputPattern.test(inputValue)) {
            setError("Please enter a valid city name");
            setHistoryData(null);
            return;
        }
        try {
            const response = await getHistoryWeather(inputValue, new Date().toISOString().slice(0, 10))
            let now = new Date(response.data.location.localtime);
            const data = response.data; 
            console.log(data)

            setHistoryData(data);
            let yesterdayDate;
            let tomorrowDate;
            if (now.getHours() == 23) {
                tomorrowDate = new Date();
                tomorrowDate.setDate(now.getDate() + 1);
                const formattedDate = tomorrowDate.toISOString().slice(0, 10);
                const res = await getHistoryWeather(inputValue, formattedDate);
                setTomorrow(res.data);
            } else if (now.getHours() < 3) {
                yesterdayDate = new Date();
                yesterdayDate.setDate(now.getDate() - 1);
                const formattedDate = yesterdayDate.toISOString().slice(0, 10);
                const res = await getHistoryWeather(inputValue, formattedDate);
                setYesterday(res.data);
            }
            setShowWeatherCard(true)
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setShowWeatherCard(false)
                setError("Invalid city name. Please enter a valid city name.");
            } else {
                setShowWeatherCard(false)
                setError("An error occurred. Please try again later.");
            }
            setHistoryData(null);
            setTomorrow(null)
            setYesterday(null)
        }
    };

    const lastUpdated = historyData && historyData.current.last_updated;
    const lat = historyData && historyData.location.lat;
    const lon = historyData && historyData.location.lon;

    return (
        <div className="main">
            <div className='search'>
                <img src={logo} className='logo' alt="Weather App Logo" />
                <div className='form'>
                    <div className='text'>
                        Use our weather app to see the weather around the world
                    </div>
                    <div className='input-search'>
                        <label htmlFor="city-input">City name</label>
                        <input
                            id="city-input"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            aria-describedby="error-message"
                        />
                        <button onClick={handleButtonClick} disabled={!inputValue}>
                            Check
                        </button>
                        {error && <p id="error-message" role="alert">{error}</p>}
                    </div>
                </div>
            </div>
            <div className='card'>
                {showWeatherCard && <WeatherCard historyWeatherData={historyData} yesterday={yesterday} tomorrow={tomorrow} />}
            </div>
            {showWeatherCard && (
                <div className="additional-info">
                    <p className="info-line">latitude: {lat} <span className="spacer"></span> longitude: {lon}</p>
                    <p className="info-line">accurate to: {lastUpdated}</p>
                </div>
            )}
        </div>
    );
};

export default CitySearch;