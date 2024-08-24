import React, { useRef, useState } from 'react';
import WeatherCard from "./WeatherCard";
import { getHistoryWeather } from './weatherApi';

const CitySearch = () => {
    const inputRef = useRef("");
    const [historyData, setHistoryData] = useState(null);
    const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

    const handleButtonClick = async () => {
        try {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const fullDate = `${year}-${month}-${day}`;

            let currentHour = today.getHours();

            const response = await getHistoryWeather(inputRef.current.value, fullDate);
            const data = response.data;

            const hourlyData = data.forecast.forecastday[0].hour;
            const hours = [currentHour - 3, currentHour - 2, currentHour - 1, currentHour, currentHour + 1].filter(h => h >= 0 && h < 24);

            const hourlyTemps = hours.map(h => ({
                hour: h,
                temp: hourlyData[h].temp_c + '°C'
            }));

            setHourlyTemperatures(hourlyTemps);
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
