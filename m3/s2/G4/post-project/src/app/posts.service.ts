
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IPosts } from './Models/iposts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/posts'; // Assuming this is your API URL
  private posts: IPosts[] = []

  constructor(private http: HttpClient) {
    this.getAll().subscribe(data => {
      this.posts = data.allPosts;
    });
  }

  getAll(): Observable<{ allPosts: IPosts[], activePosts: IPosts[], inactivePosts: IPosts[] }> {
    return this.http.get<IPosts[]>(this.apiUrl).pipe(
      map(posts => {
        const activePosts = posts.filter(p => p.active);
        const inactivePosts = posts.filter(p => p.active === false);
        return { allPosts: posts, activePosts, inactivePosts };
      })
    );
  }

  getById(id: number): Observable<IPosts> {
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

  toggleActive(post: IPosts): Observable<IPosts> {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      const updatedPost = { ...post, active: !post.active };
      this.posts.splice(index, 1, updatedPost); // Aggiorna localmente lo stato del post nell'array
      return this.http.put<IPosts>(`${this.apiUrl}/${post.id}`, updatedPost)
        .pipe(
          catchError((error) => {
            // Gestisci qui eventuali errori nella richiesta HTTP
            console.error('Si è verificato un errore nella richiesta PUT:', error);
            return throwError(() => new Error('Si è verificato un errore nella richiesta PUT'));
          })
        );
    }
    return throwError(() => new Error('Post non trovato'));
  }


  toggleActiveMap(post: IPosts): Observable<IPosts> {
    const updatedPost = { ...post, active: !post.active };

    const updatedPosts = this.posts.map(p => {
      if (p.id === updatedPost.id) {
        return updatedPost;
      }
      return p;
    });

    return this.http.put<IPosts>(`${this.apiUrl}/${post.id}`, updatedPost).pipe(
      map((response: IPosts) => {
        this.posts = updatedPosts; // Aggiorna localmente l'intero array di post con il nuovo stato
        return response;
      })
    );
  }

}
