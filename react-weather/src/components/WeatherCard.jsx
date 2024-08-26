import React, { useEffect, useState } from "react";
// import "../weatherCard.css";

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
            <div className="weather-card">
                <h1> {region}</h1>
                <h1>{country}</h1> 
                <p> {localtime}</p>
                <div className="temperature">{temp_c}°</div>
                <p className="condition">{text}</p>
                <div className="details">
                    <div>
                        <p>Precipitation</p>
                        <p>{precip_mm} mm</p>
                    </div>
                    <div>
                        <p>Humidity</p>
                        <p>{humidity}%</p>
                    </div>
                    <div>
                        <p>Wind</p>
                        <p>{wind_kph} km/h</p>
                    </div>
                </div>
                <div className="hourly-forecast">
                    {hourlyTemperatures.map(({ hour, temp }) => (
                        <div key={hour}>
                            <span>{hour}:00</span> <span>{temp}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    
};
export default WeatherCard