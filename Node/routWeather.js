import  Router from "express";
import { getHistoryWeather } from "./WeatherControler.js";
const router=Router()

router.get('/',getHistoryWeather );

export default router