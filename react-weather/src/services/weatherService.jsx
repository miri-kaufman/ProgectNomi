import axios from "axios"
const baseUrl="http://localhost:4000/weather";
 export const getHistoryWeather=(city,dt)=>{
    console.log(city,dt);
    return axios.get(`${baseUrl}?city=${city}&dt=${dt}`,
    );
 }