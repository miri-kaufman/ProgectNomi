import axios from 'axios';

const WEATHER_API_URL_HISTORY = 'http://api.weatherapi.com/v1/forecast.json';
  const getHistorytWeather= async (req, res) => {
    console.log(req.query);
    console.log("is");
      const {city} = req.query;
      if (!city) {
        return res.status(400).json({ error: 'City   parameters are required' });
      }
      try {
        const response = await axios.get(`${WEATHER_API_URL_HISTORY}?key=${process.env.APIKEY}&q=${city}`);
        const weatherData = response.data;
        console.log(weatherData);
        res.json(weatherData);
      } 
      catch (error) {
        // Handle API request failures and invalid city names
        if (error.response && error.response.status === 400) {
          res.status(400).json({ error: 'Invalid city name or date ' });
        } else {
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    };
  
  
export {getHistorytWeather} 