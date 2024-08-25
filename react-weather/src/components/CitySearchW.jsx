import React, { useRef, useState } from 'react';
import WeatherCard from "./WeatherCard";
import { getHistoryWeather } from './weatherApi';

const CitySearch = () => {
    const inputRef = useRef("");
    const [historyData, setHistoryData] = useState(null);

    const handleButtonClick = async () => {
        try {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const fullDate = `${year}-${month}-${day}`;
            const response = await getHistoryWeather(inputRef.current.value, fullDate);
            const data = response.data;
            setHistoryData(data);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={handleButtonClick}>Check</button>
            {historyData && <WeatherCard historyWeatherData={historyData} />}
        </div>
    );
};
export default CitySearch;
