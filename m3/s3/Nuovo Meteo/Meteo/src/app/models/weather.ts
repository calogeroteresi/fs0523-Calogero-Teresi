
import { IWeatherForecast } from './iweather-forecast';
export interface Weather {
  city: {
    id:number;
    name: string;
    coord:{
      lat: number;
      lon: number;
    }
    country:string;
    population:string;
    sunrise:number;
    sunset:number;
    timezone:number
  }
  cnt:number;
  cod:string;
  list: IWeatherForecast [];
  }



