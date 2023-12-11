import { UsersService } from './../../../users.service';
import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather } from '../../../models/current-weather';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../../weather.service';
import { Weather } from '../../../models/weather';
import { AuthService } from '../../../Pages/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  weatherDataSubscription: Subscription | undefined;
  weatherDataArray: CurrentWeather[] = [];
  weather5day: Weather[] = [];
  icon: string = '';
  situation: string = '';
  temperatura: number = 0;
  lastEdit:Date=new Date;
  currentDate: Date = new Date();

  constructor(private weatherSvc: WeatherService, private UsersSvc: UsersService, private authSvc : AuthService) {
    this.currentDate = new Date();
    this.weatherDataSubscription = this.weatherSvc.getWeatherDataArray().subscribe((data) => {
      this.weatherDataArray = data;
      console.log('Dati meteo ricevuti:', this.weatherDataArray);
      this.icon = this.weatherDataArray[0].weather[0].icon;
      this.situation = this.weatherDataArray[0].weather[0].description;
      this.temperatura = this.weatherDataArray[0].main.temp;
      this.lastEdit = new Date(this.weatherDataArray[0].dt * 1000);
      this.currentDate
    });
  }

    ngOnInit(): void {
      this.weather5day = [];
      this.weatherSvc.getWeather().subscribe((data: any) => {
        this.weather5day = data;
        console.log('aaaaaa:', data)
      });
      this.authSvc.user$.subscribe((accessData) => {
        this.userName = accessData?.user.nome;
      });
  }
  userName:string|undefined = '';


  addToFavourites() {
    this.authSvc.user$.subscribe((accessData) => {
      if (accessData) {
        console.log(accessData);
        console.log('vvvvvvv:',this.weatherDataArray[0].coord.lat);
        if(!this.weather5day[0].city.id) return;
        this.UsersSvc.addFavourite(Number(accessData.user.id), {

          nome: this.weather5day[0].city.name|| "Città sconosciuta",
          lat: this.weatherDataArray[0].coord.lat,
          lon: this.weather5day[0].city.coord.lon,
          cityId: this.weather5day[0].city.id ,
        });
      }else{

        alert("Per aggiungere ai preferiti devi loggarti o registrarti");
      }
    });
  }

}
