import React, { useState } from 'react';
import WeatherCard from "./WeatherCard";
import { getHistoryWeather } from './weatherApi';

const CitySearch = () => {
    const [inputValue, setInputValue] = useState('');
    const [historyData, setHistoryData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
      if (!inputValue) {
        setError("Please enter a city");
        setHistoryData(null);
        return;
      }
        try {
            const response = await getHistoryWeather(inputValue);
            const data = response.data;
            setError(null);
            setHistoryData(data);
        } catch (error) {
          setError('Error fetching weather data. Please try again.');
            setHistoryData(null);
            console.log('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
            />
            <button onClick={handleButtonClick} disabled={!inputValue}>
                Check
            </button>
            {historyData && <WeatherCard historyWeatherData={historyData} />}
            {error && <p>{error}</p>}
        </div>
    );
};

export default CitySearch;
