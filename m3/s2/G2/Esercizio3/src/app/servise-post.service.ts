import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPosts } from './Models/i-posts';

@Injectable({
  providedIn: 'root'
})
export class ServisePostService {
  private apiUrl = 'http://localhost:3000/pizze'; // Assuming this is your API URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ allPosts: IPosts[], activePosts: IPosts[], inactivePosts: IPosts[] }> {
    return this.http.get<IPosts[]>(this.apiUrl).pipe(
      map(posts => {
        const activePosts = posts.filter(p => p.active);
        const inactivePosts = posts.filter(p => !p.active);
        return { allPosts: posts, activePosts, inactivePosts };
      })
    );
  }

  getById(id: string): Observable<IPosts> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IPosts>(url);
  }

  create(post: Partial<IPosts>): Observable<IPosts> {
    return this.http.post<IPosts>(this.apiUrl, post);
  }

  update(post: IPosts): Observable<IPosts> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<IPosts>(url, post);
  }

  delete(id: string): Observable<IPosts> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<IPosts>(url);
  }
}
