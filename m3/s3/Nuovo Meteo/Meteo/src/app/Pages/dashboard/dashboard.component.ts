import { Component } from '@angular/core';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { IFavourite } from '../../models/ifavourite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  favourites: IFavourite[]=[];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private usersSvc: UsersService
  ) {}


  ngOnInit(): void {
    this.authService.user$.subscribe((accessData) => {
      if(!accessData?.user?.id) {
        this.router.navigate(['/auth']);
        return;
      }
      this.usersSvc
        .getFavourites(accessData?.user.id)
        .subscribe((data: any) => {
          this.favourites = data;
          console.log(this.favourites);

        });
    });
  }

  navigateToOtherRoute(lat: any, lon: any): void {
    this.router.navigate(['/home'], { queryParams: { lat: lat, lon: lon } });
  }

}
