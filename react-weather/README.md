# Weather App

This project is a weather application that allows users to search for historical weather data for a specific city. The application is built using Node.js for the backend and React with Vite for the frontend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend (Node.js)

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app/Node
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `Node` directory and add your API key:
    ```env
    APIKEY=your_weather_api_key
    ```

4. Start the server:
    ```bash
    npm start
    ```

### Frontend (React with Vite)

1. Navigate to the React project directory:
    ```bash
    cd ../react-weather
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a city name in the search input and click the "Check" button to fetch historical weather data.

## API Endpoints

### GET /

Fetch historical weather data for a specific city.

- **URL:** `/`
- **Method:** `GET`
- **Query Parameters:**
  - `city` (required): The name of the city.
  - `futureHour` (optional): The future hour to fetch weather data for.
  - `pastHour` (optional): The past hour to fetch weather data for.

**Example Request:**
```http
GET /?city=London&futureHour=15&pastHour=10

{
  "location": {
    "name": "London",
    "region": "City of London, Greater London",
    "country": "United Kingdom",
    "lat": 51.52,
    "lon": -0.11,
    "tz_id": "Europe/London",
    "localtime_epoch": 1618317040,
    "localtime": "2021-04-13 14:30"
  },
  "forecast": {
    "forecastday": [
      {
        "date": "2021-04-13",
        "hour": [
          {
            "time_epoch": 1618315200,
            "time": "2021-04-13 14:00",
            "temp_c": 14.0,
            "temp_f": 57.2,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            }
          }
        ]
      }
    ]
  }
}
