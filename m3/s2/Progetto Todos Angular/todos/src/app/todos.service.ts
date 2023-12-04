import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ITodo } from './Models/itodo'; // Assicurati di avere un'interfaccia ITodo appropriata

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos'; // Assumendo che questa sia l'URL della tua API
  private todos: ITodo[] = [];

  constructor(private http: HttpClient) {
    this.getAll().subscribe(data => {
      this.todos = data.allTodos;
    });
  }

  getAll(): Observable<{ allTodos: ITodo[], pendingTodos: ITodo[], completedTodos: ITodo[] }> {
    return this.http.get<ITodo[]>(this.apiUrl).pipe(
      map(todos => {
        const pendingTodos = todos.filter(t => !t.completed);
        const completedTodos = todos.filter(t => t.completed);
        return { allTodos: todos, pendingTodos, completedTodos };
      })
    );
  }

  getById(id: number): Observable<ITodo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ITodo>(url);
  }

  create(todo: Partial<ITodo>): Observable<ITodo> {
    return this.http.post<ITodo>(this.apiUrl, todo);
  }

  update(todo: ITodo): Observable<ITodo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<ITodo>(url, todo);
  }

  delete(id: number): Observable<ITodo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ITodo>(url);
  }

  deleteAll(): Observable<any> {
    const url = `${this.apiUrl}/all`; // Esempio: URL per eliminare tutti gli elementi

   
    const confirmed = confirm('Sei sicuro di voler eliminare tutti gli elementi?');

    if (confirmed) {
      return this.http.delete(url);
    } else {

      return EMPTY; // o throwError('Eliminazione annullata');
    }
  }

  onTodoCreated(newTodo: ITodo): void {
    this.todos.push(newTodo);
    console.log(newTodo);
    console.log(this.todos);


  }

  toggleCompleted(todo: ITodo): Observable<ITodo> {

    //  const updatedTodo = { ...todo, completed: !todo.completed };
      return this.http.put<ITodo>(`${this.apiUrl}/${todo.id}`, todo)
        .pipe(
          catchError((error) => {
            console.error('Si è verificato un errore nella richiesta PUT:', error);
            return throwError(() => new Error('Si è verificato un errore nella richiesta PUT'));
          })
        );
  }
}
