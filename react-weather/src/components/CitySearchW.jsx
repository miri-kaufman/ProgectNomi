import React, { useState } from 'react';
import WeatherCard from "./WeatherCard";
import { getHistoryWeather } from './weatherApi';
import './style.css';
import logo from '../assets/logo.svg'; 

const CitySearch = () => {
    const [inputValue, setInputValue] = useState('');
    const [historyData, setHistoryData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
      const validInputPattern = /^[a-zA-Z\s]+$/; // Only allows English letters and spaces
        // if (!inputValue) {
        //     setError("Please enter a city");
        //     console.log(error);
        //     // setHistoryData(null);
        //     return;
        // }
        if (!validInputPattern.test(inputValue)) {
          setError("Please enter a valid city name");
          setHistoryData(null);
          console.log(error);
          return;
      }
        try {
            const response = await getHistoryWeather(inputValue);
            const data = response.data;
            setError(null);
            setHistoryData(data);
        }
        catch (error) {
          if (error.response && error.response.status === 400) {
              setError("Invalid city name. Please enter a valid city name.");
          } else {
              setError("An error occurred. Please try again later.");
          }
          setHistoryData(null);
          console.log('Error fetching weather data:', error);
      }
    };

    return (
        <div className="main">
            <div className='search'>
                <img src={logo} className='logo' alt="Weather App" />
                <div className='form'>
                    <div className='text'>
                        Use our weather app to see the weather around the world
                    </div>
                    <div className='input-search'>
                        <label>City name</label>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleButtonClick} disabled={!inputValue}>
                            Check
                        </button>
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>
            <div className='card'>
                {historyData && <WeatherCard historyWeatherData={historyData} />}
            </div>

        </div>
    );
};

export default CitySearch;
