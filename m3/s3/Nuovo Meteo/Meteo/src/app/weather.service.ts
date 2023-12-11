import { Injectable } from '@angular/core';
import { environment } from './environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { CurrentWeather } from './models/current-weather';
import { Weather } from './models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = environment.apiUrlCity;
  private apiKey = environment.apiKey;
  private urlWeather = environment.apiUrlWeather;
  private nowWeather = environment.apiUrlWeatherNow;
  units = 'metric';
  private weatherDataArraySubject: Subject<CurrentWeather[]> = new Subject<CurrentWeather[]>();
  private weatherSubject: Subject<Weather[]> = new Subject<Weather[]>();


  constructor(private http: HttpClient) {}

  getCity(cityName: string): Observable<any> {
    const url = `${this.apiUrl}`;

    const params = new HttpParams()
      .set('q', `${cityName}`)
      .set('limit', '5')
      .set('appid', this.apiKey)


    return this.http.get(url, { params });
  }

  getWeatherForecast(lat:number, lon:number): Observable<any> {

    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', this.units)
    .set('appid', this.apiKey)


    return this.http.get(this.urlWeather, { params }).pipe(catchError(this.errorHandler));
  }

  getWeatherNow(lat:number, lon:number): Observable<any> {

    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', this.units)
    .set('appid', this.apiKey)


    return this.http.get(this.nowWeather, { params }).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse): Observable<never> {
return throwError(() => error);
}

setWeatherDataArray(data: CurrentWeather[]): void {
  this.weatherDataArraySubject.next(data);
}

getWeatherDataArray(): Subject<CurrentWeather[]> {
  return this.weatherDataArraySubject;
}
setWeather(data: Weather[]): void {
  this.weatherSubject.next(data);
}

getWeather(): Subject<Weather[]> {
  return this.weatherSubject;
}

direzioneVento(angolo: number): { nome: string, direzione: string, descrizione: string } {
  let direzione = "";

  if (angolo >= 0 && angolo < 45) {
    direzione = "Nord";
    return { nome: "Tramontana", descrizione: "Vento freddo che porta con sé le basse temperature del continente europeo.", direzione };
  } else if (angolo >= 45 && angolo < 90) {
    direzione = "Nord-Est";
    return { nome: "Grecale", descrizione: "Vento freddo e secco in Inverno, fresco e piacevole d'Estate.", direzione };
  } else if (angolo >= 90 && angolo < 135) {
    direzione = "Est";
    return { nome: "Levante", descrizione: "Vento fresco e umido, caldo in Estate e freddo in Inverno.", direzione };
  } else if (angolo >= 135 && angolo < 180) {
    direzione = "Sud-Est";
    return { nome: "Scirocco", descrizione: "Vento caldo e umido, portatore di piogge.", direzione };
  } else if (angolo >= 180 && angolo < 225) {
    direzione = "Sud";
    return { nome: "Ostro", descrizione: "Vento caldo e umido, detto anche di Mezzogiorno.", direzione };
  } else if (angolo >= 225 && angolo < 270) {
    direzione = "Sud-Ovest";
    return { nome: "Libeccio", descrizione: "Vento caldo e portatore di sabbia del deserto.", direzione };
  } else if (angolo >= 270 && angolo < 315) {
    direzione = "Ovest";
    return { nome: "Ponente", descrizione: "Vento fresco e piacevole.", direzione };
  } else if (angolo >= 315 && angolo <= 360) {
    direzione = "Nord-Ovest";
    return { nome: "Maestrale", descrizione: "Vento fresco e sereno, ma può preannunciare una perturbazione.", direzione };
  }

  return { nome: "Tramontana", descrizione: "", direzione: "Nord" };
}


}
