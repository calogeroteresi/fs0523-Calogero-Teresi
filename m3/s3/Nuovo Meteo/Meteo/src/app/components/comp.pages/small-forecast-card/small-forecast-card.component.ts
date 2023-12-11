import { IForecastByDay } from './../../../models/iforecast-by-day';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from '../../../models/weather';
import { WeatherService } from '../../../weather.service';

@Component({
  selector: 'app-small-forecast-card',
  templateUrl: './small-forecast-card.component.html',
  styleUrls: ['./small-forecast-card.component.scss'],
})
export class SmallForecastCardComponent implements OnInit {
  weatherDataSubscription: Subscription | undefined;
  weatherDataArray: Weather[] = [];
  forecastsByDay: IForecastByDay[] = [];

  constructor(private weatherSvc: WeatherService) {}

  ngOnInit(): void {
    this.weatherDataArray = [];
    this.weatherSvc.getWeather().subscribe((data: any) => {
      this.weatherDataArray = data;
      this.groupForecastsByDay();
    });
  }
  groupForecastsByDay(): void {
    const forecastsByDayMap: {
      [key: string]: {
        minTemps: number[];
        maxTemps: number[];
        descriptions: string[];
      };
    } = {};

    this.weatherDataArray[0].list.forEach((forecast: any) => {
      if (forecast.dt) {
        const date = new Date(forecast.dt * 1000);
        if (!isNaN(date.getTime())) {
          const day = date.toISOString().split('T')[0];

          if (!forecastsByDayMap[day]) {
            forecastsByDayMap[day] = {
              minTemps: [],
              maxTemps: [],
              descriptions: [],
            };
          }

          forecastsByDayMap[day].minTemps.push(forecast.main.temp_min);
          forecastsByDayMap[day].maxTemps.push(forecast.main.temp_max);
          forecastsByDayMap[day].descriptions.push(
            forecast.weather[0].description
          );
        }
      }
    });

    this.forecastsByDay = Object.keys(forecastsByDayMap).map((date) => {
      const { minTemps, maxTemps, descriptions } = forecastsByDayMap[date];
      const uniqueDescriptions = Array.from(new Set(descriptions)).join(', ');

      const filteredForecasts = this.weatherDataArray[0].list.filter(
        (forecast: any) => {
          const forecastDate = new Date(forecast.dt * 1000);
          return forecastDate.toISOString().split('T')[0] === date;
        }
      );

      const firstForecast = filteredForecasts[0];
      let minTemp = firstForecast.main.temp_min;
      let maxTemp = firstForecast.main.temp_max;

      filteredForecasts.forEach((forecast: any) => {
        minTemp = Math.min(minTemp, forecast.main.temp_min);
        maxTemp = Math.max(maxTemp, forecast.main.temp_max);
      });

      return {
        date,
        details: {
          minTemperature: minTemp,
          maxTemperature: maxTemp,
          description: uniqueDescriptions,
        },
        forecasts: filteredForecasts,
      } as IForecastByDay;
    });

    console.log('Previsioni organizzate per giorno:', this.forecastsByDay);
  }
  selectedDate: string | null = null; // Variabile per tenere traccia del giorno selezionato

  // Metodo per impostare il giorno selezionato e visualizzare i relativi forecast
  showForecastsBySelectedDate(date: string): void {
    this.selectedDate = date;
  }

  // Metodo per verificare se un forecast appartiene al giorno selezionato
  isForecastForSelectedDate(forecastDate: string): boolean {
    return this.selectedDate === forecastDate;
  }
}
