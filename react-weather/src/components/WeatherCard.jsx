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
    // const today=historyWeatherData.forecast.forecastday[0]
  

    const { region, country, localtime } = historyWeatherData.location;
    const todayForecast = historyWeatherData.forecast.forecastday[0].hour[0];
    const { humidity, precip_mm, wind_kph,temp_c } = todayForecast;
    const {text}=todayForecast.condition

    console.log(todayForecast);
    return (
        <div>
             <h1>Weather in {region}, {country}</h1>
            <p>Local Time: {localtime}</p>
            <p>Temp:{temp_c}</p>
            <p>{text}</p>
            <p>Humidity: {humidity}%</p>
            <p>Precipitation: {precip_mm} mm</p>
            <p>Wind: {wind_kph} kph</p>
            <h1>Weather in all hours</h1>
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