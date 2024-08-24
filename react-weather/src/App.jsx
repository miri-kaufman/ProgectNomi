import React, { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import CitySearch from "./components/CitySearchW"
function App() {
  const [city, setCity] = useState("");

  return (
<>
<CitySearch/>
</>
      // <WeatherCard city={city} />
      // <CitySearch/><
  );
}

export default App;