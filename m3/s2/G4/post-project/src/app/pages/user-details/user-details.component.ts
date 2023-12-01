import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import { IUsers } from '../../Models/iusers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: IUsers | undefined;
  userSubscription: Subscription | undefined;

  constructor(private router: ActivatedRoute, private userSrv: UsersService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = +params['id'];
      this.userSubscription = this.userSrv.getUserById(id).subscribe({
        next: (user: IUsers) => {
          this.user = user;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}


