import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { IUsers } from '../../Models/iusers';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUsers[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: IUsers[]) => {
        this.users = data;
      },
      error: (error: any) => {
        // Gestisci gli errori qui, se necessario
        console.log(error);
      }
    });
  }
}
