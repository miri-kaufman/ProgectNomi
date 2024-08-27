import React, { useEffect, useState } from "react";
import './style.css';

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
    const { region, country, localtime, lat, lon,last_updated } = historyWeatherData.location;
    const todayForecast = historyWeatherData.forecast.forecastday[0].hour[0];
    const { humidity, precip_mm, wind_kph, temp_c } = todayForecast;
    const { text } = todayForecast.condition

    console.log(todayForecast);
    return (
        <div className="weather-card">
            <div>
                <h1> {region}</h1>
                <h2>{country}</h2>
                <p className="location"> {localtime}</p>
                <div className="temperature">{temp_c}°</div>
                <p className="condition">{text}</p>
                <div className="details">
                    <div>
                        <p className="text1">Precipitation</p>
                        <p className="text2">{precip_mm} mm</p>
                    </div>
                    <div>
                        <p className="text1">Humidity</p>
                        <p className="text2">{humidity}%</p>
                    </div>
                    <div>
                        <p className="text1">Wind</p>
                        <p className="text2">{wind_kph} km/h</p>
                    </div>
                </div>
                <div className="hourly-forecast">
                    {hourlyTemperatures.map(({ hour, temp }) => (
                        <div key={hour}>
                            <p className="clock1">{hour}:00</p> <p className="clock2">{temp}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

};
export default WeatherCard