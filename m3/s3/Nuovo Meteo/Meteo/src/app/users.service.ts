import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, finalize, never, throwError } from 'rxjs';
import { IFavourite } from './models/ifavourite';
import { AuthService } from './Pages/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  getFavourites(userId: string) {
    return this.http
      .get('http://localhost:3000/favourites?userId=' + userId)

  }

  addFavourite(userId: number, cityData:IFavourite) {
    return this.http
      .post('http://localhost:3000/favourites', {
        userId: userId,
        nome: cityData.nome,
        lat: cityData.lat,
        lon: cityData.lon,
        cityId: cityData.cityId
      })
      .pipe()
      .subscribe((data: any) => {
        console.log(data);
        return data;
      });
  }

  deleteFavourite(id: number) {
    return this.http
      .delete('http://localhost:3000/favourites/' + id)

  }




}
