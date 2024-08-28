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

1. Open your browser and navigate to `http://localhost:5173`.
2. Enter a city name in the search input and click the "Check" button to fetch historical weather data.

## API Endpoints

### GET /weather
Fetch historical weather data for a specific city.

**Parameters:**
- `city` (string): The name of the city.

**Response:**
- `200 OK`: Returns weather data.
- `400 Bad Request`: Invalid city name.
- `500 Internal Server Error`: Server error.

## Components

### SearchBar
A component that allows users to input a city name and trigger a search.

### WeatherDisplay
A component that displays the fetched weather data.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.