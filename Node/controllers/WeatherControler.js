import axios from 'axios';

const WEATHER_API_URL_HISTORY = 'http://api.weatherapi.com/v1/forecast.json';

const getHistoryWeather = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City parameters are required' });
    }

    try {
        const response = await axios.get(`${WEATHER_API_URL_HISTORY}?key=${process.env.APIKEY}&q=${city}`);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            res.status(400).json({ error: 'Invalid city name' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export { getHistoryWeather };