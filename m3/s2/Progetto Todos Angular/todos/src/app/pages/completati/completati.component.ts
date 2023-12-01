import { Component } from '@angular/core';
import { TodoService } from '../../todos.service';
import { ITodo } from '../../Models/itodo';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-completati',
  templateUrl: './completati.component.html',
  styleUrl: './completati.component.scss'
})
export class CompletatiComponent {

  todos: ITodo[]=[];

  constructor(private todoSvc: TodoService){
}

ngOnInit (): void {
  this.fetchTodos();
}

fetchTodos(): void {
  this.todoSvc.getAll().subscribe({
    next: (data: { completedTodos: ITodo[]; }) => {
      this.todos = data.completedTodos;
    },
    error: (error) => {
      console.error('Si è verificato un errore nel recupero dei post attivi:', error);
    }
  } as Observer<any>);
}


onDelete(id: number): void {
  this.todoSvc.delete(id).subscribe({
    next: () => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    error: error => {
      console.error('Si è verificato un errore durante l\'eliminazione:', error);
      // Gestisci l'errore come preferisci
    }
  });
}

toggleTodoStatus(post: ITodo): void {
  this.todoSvc.toggleCompleted(post).subscribe(updatedPost => {
    const index = this.todos.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      this.todos.splice(index, 1); // Rimuovi localmente il post con il nuovo stato
    }
  });
}

}
