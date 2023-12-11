import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from '../../../weather.service';
import { Subscription } from 'rxjs';
import { CurrentWeather } from '../../../models/current-weather';
import { IVento } from '../../../models/i-vento';
import { Weather } from '../../../models/weather';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnDestroy, OnInit {

  searchForm: FormGroup;
  weatherSubscription: Subscription | undefined;
  recentSearches: any[] = [];
  weatherDataArray: CurrentWeather[] = [];
  weatherForecast: Weather[] = [];
  angoloVento?: number;
  nomeVento: IVento[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const receivedLat = parseFloat(params['lat']);
      const receivedLon = parseFloat(params['lon']);

      if (!isNaN(receivedLat) && !isNaN(receivedLon)) {
        console.log('Latitudine:', receivedLat);
        console.log('Longitudine:', receivedLon);
        this.currentWeather(receivedLat, receivedLon);
        this.selectCity(receivedLat, receivedLon);
      } else {
        console.error('Valori di lat e lon non presenti o non validi nella URL');
        this.currentWeather(41.8933203, 12.4829321);
        this.selectCity(41.8933203, 12.4829321);
      }
    });


  }

  constructor(
    private formBuilder: FormBuilder,
    private weatherSvc: WeatherService,
    private route: ActivatedRoute,
  ) {
    this.searchForm = this.formBuilder.group({
      cityName: ['']
    });
  }

  onSubmit() {
    const cityName = this.searchForm.get('cityName')?.value;
    this.recentSearches = [];
    this.weatherSubscription = this.weatherSvc.getCity(cityName)
      .subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.recentSearches.push(...data);
          } else {
            this.recentSearches.push(data);
          }
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  selectCity(lat:number, long:number) {

    this.weatherForecast = [];
    this.weatherSubscription = this.weatherSvc.getWeatherForecast(lat, long)
      .subscribe({
        next: (forecastData) => {
          this.weatherForecast.push(forecastData);
          console.log('Dati meteo forecast:', this.weatherForecast);
          console.log('list', this.weatherForecast[0].city);
          console.log('Previsioni meteo:', forecastData);
          this.weatherSvc.setWeather(this.weatherForecast);
        },
        error: (error) => {
          console.error('Errore nelle previsioni del tempo:', error);
        }
      });
  }

  currentWeather(lat: number, long: number) {
    this.weatherDataArray = [];
    this.weatherSubscription = this.weatherSvc.getWeatherNow(lat, long)
      .subscribe({
        next: (forecastData) => {
          console.log('Previsioni meteo:', forecastData);
          this.weatherDataArray.push(forecastData);
          this.angoloVento = this.weatherDataArray[0].wind.deg
          const wind = this.weatherSvc.direzioneVento(this.angoloVento);
          this.weatherDataArray[0].wind.direction = wind
          console.log(this.nomeVento);
          console.log('Dati meteo:', this.weatherDataArray);
          this.weatherSvc.setWeatherDataArray(this.weatherDataArray);
          setTimeout(()=>{
            this.recentSearches = [];
          },1000)
        },
        error: (error) => {
          console.error('Errore nelle previsioni del tempo:', error);
        }
      });
  }

  startMethod(lat: any, lon: any): void {
    this.currentWeather(lat, lon);
    this.selectCity(lat, lon);
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
