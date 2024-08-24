import React, { useEffect, useState } from "react";
import "../weatherCard.css";

const WeatherCard = ({ historyWeatherData }) => {
    const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

    useEffect(() => {
        const fetchHourlyTemperatures = () => {
            const currentHour = new Date(historyWeatherData.location.localtime).getHours();
            const hourlyData = historyWeatherData.forecast.forecastday[0].hour;
            const hours = [currentHour - 3, currentHour - 2, currentHour - 1, currentHour, currentHour + 1].filter(h => h >= 0 && h < 24);

            const hourlyTemps = hours.map(h => ({
                hour: h,
                temp: hourlyData[h].temp_c + '°C'
            }));

            setHourlyTemperatures(hourlyTemps);
        };

        fetchHourlyTemperatures();
    }, [historyWeatherData]);
    const today=historyWeatherData.forecast.forecastday[0]
    return (
        <div>
            <h1>Weather in {historyWeatherData.location.region}</h1>
            <div>
                {hourlyTemperatures.map(({ hour, temp }) => (
                    <div key={hour}>
                        <strong>{hour}:00 -</strong> {temp}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default WeatherCard