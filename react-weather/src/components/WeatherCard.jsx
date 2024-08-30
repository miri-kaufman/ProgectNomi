import React, { useEffect, useState } from "react";
import moment from 'moment';
import '../styles/style.css';

const WeatherCard = ({ historyWeatherData, yesterday, tomorrow }) => {
    const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

    const fetchHourlyTemperatures = () => {
        const currentHour = new Date(historyWeatherData.location.localtime).getHours();
        const hourlyDataToday = historyWeatherData.forecast.forecastday[0].hour;
        const hourlyDataTomorrow = tomorrow && tomorrow.forecast.forecastday[0].hour;
        const hourlyDataYesterday = yesterday && yesterday.forecast.forecastday[0].hour;
        const hours = [
            (currentHour - 3 + 24) % 24,
            (currentHour - 2 + 24) % 24,
            (currentHour - 1 + 24) % 24,
            currentHour,
            (currentHour + 1) % 24
        ];
        const hourlyTemps = hours.map(h => {
            let temp;
            console.log(h);
            if (currentHour === 23 && h === 0) {
                temp = Math.ceil(hourlyDataTomorrow[h].temp_c);
            } else if (currentHour < 3 && h >= 21) {
                temp = Math.ceil(hourlyDataYesterday[h].temp_c);
            } else {
                temp = Math.ceil(hourlyDataToday[h].temp_c);
            }

            return { hour: h, temp: `${temp}°` };
        });

        setHourlyTemperatures(hourlyTemps);
    };

    useEffect(() => {
        fetchHourlyTemperatures();
    }, [historyWeatherData, tomorrow, yesterday]);

    const { region, country, localtime } = historyWeatherData.location;
    const dateParts = localtime.split(" ");
    const date = moment(dateParts[0]);
    const localtimeString = `${date.format('DD/MM/YY')} at ${dateParts[1]}`;
    const todayForecast = historyWeatherData.forecast.forecastday[0].hour[0];
    const { humidity, precip_mm, wind_kph } = todayForecast;
    const { temp_c } = historyWeatherData.current;
    const { text } = todayForecast.condition;
    return (
        <div className="weather-card">
            <div>
                <h1>{region}</h1>
                <h2>{country}</h2>
                <p className="location">{localtimeString}</p>
                <div className="temperature">{Math.ceil(temp_c)}°</div>
                <p className="condition">{text}</p>
                <div className="details">
                    <div>
                        <p className="text1">precipitation</p>
                        <p className="text2">{precip_mm} mm</p>
                    </div>
                    <div>
                        <p className="text1">humidity</p>
                        <p className="text2">{humidity}%</p>
                    </div>
                    <div>
                        <p className="text1">wind</p>
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

export default WeatherCard;