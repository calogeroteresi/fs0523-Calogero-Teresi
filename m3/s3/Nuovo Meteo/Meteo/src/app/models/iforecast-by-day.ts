import { IWeatherForecast } from "./iweather-forecast";

export interface IForecastByDay {
  date: string;
  details: {
    minTemperature: number;
    maxTemperature: number;
    description: string;
  };
  forecasts: IWeatherForecast[]; // Utilizzare IWeatherForecast invece di Weather
}
