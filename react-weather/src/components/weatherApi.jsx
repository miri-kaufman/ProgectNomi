import axios from "axios"
const baseUrl="http://localhost:4000/weather";

 export const getHistoryWeather=(city,currentDate)=>{
    console.log(city,currentDate);
    return axios.get(`${baseUrl}?city=${city}&dt=${currentDate}`,
    );
 }