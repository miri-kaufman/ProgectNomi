import  Router from "express";
import { getHistorytWeather } from "./WeatherControler.js";
const router=Router()

router.get('/',getHistorytWeather );

export default router