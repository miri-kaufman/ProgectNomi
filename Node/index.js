import  express from "express";
import cors from "cors"
import {config} from "dotenv"
import { errorHandling } from "./middleWares/errorHandling.js";

import WeatherRouter from "./routWeather.js"
config()
const app=express()
app.use(express.json())
app.use(cors())
app.use(errorHandling)

let port=process.env.PORT||3500
app.listen(port,()=>{
    console.log(`app is listen in port ${port}`);
})

app.use("/weather",WeatherRouter)
