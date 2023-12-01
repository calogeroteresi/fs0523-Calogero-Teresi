import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from './Models/iusers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000'; // Rimuovi '/users' dal path principale

  constructor(private http: HttpClient) { }

  // Metodo per recuperare tutti gli utenti
  getAllUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(`${this.apiUrl}/users`);
  }

  // Metodo per recuperare un singolo utente per ID
  getUserById(id: number): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.apiUrl}/users/${id}`);
  }
}
