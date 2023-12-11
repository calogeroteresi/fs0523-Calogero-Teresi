import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeather } from '../../../models/current-weather';
import { WeatherService } from '../../../weather.service';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})
export class DetailsCardComponent implements OnInit {
  weatherDataSubscription: Subscription | undefined;
  weatherDataArray: CurrentWeather[] = [];

  constructor(private weatherSvc: WeatherService) {
    this.weatherDataSubscription = this.weatherSvc.getWeatherDataArray().subscribe((data) => {
      this.weatherDataArray = data;
      console.log('Dati meteo ricevuti:', this.weatherDataArray);
    });
  }

  ngOnInit(): void {

  }



}
