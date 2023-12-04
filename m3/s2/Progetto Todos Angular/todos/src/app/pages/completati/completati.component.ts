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
  isLoading: boolean = true;

  constructor(private todoSvc: TodoService){
}

ngOnInit (): void {
  this.fetchTodos();
}

fetchTodos(): void {
  this.todoSvc.getAll().subscribe({
    next: (data: { completedTodos: ITodo[]; }) => {
      this.todos = data.completedTodos;
      this.isLoading = false;
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

toggleTodoStatus(todo: ITodo): void {
  console.log(todo);
  todo.completed = !todo.completed;
  this.todoSvc.toggleCompleted(todo).subscribe(updatedTodo => {
    console.log(updatedTodo);
    this.todos = this.todos.filter(todo => todo.id !== updatedTodo.id);
  });
}
deleteCompletedTodos() {
  const todosToDelete = this.todos.filter(todo => todo.completed === true);

  todosToDelete.forEach(todo => {
    this.todoSvc.delete(todo.id).subscribe({
      next: () => {
        // Rimuovi l'elemento eliminato dalla lista locale
        const index = this.todos.indexOf(todo);
        if (index > -1) {
          this.todos.splice(index, 1);
        }
      },
      error: (error) => {
        console.error(`Si è verificato un errore durante l'eliminazione del todo ${todo.id}:`, error);
        // Gestisci eventuali errori durante l'eliminazione
      }
    });
  });
}


getClassObj(todo: ITodo){
  return {
    'priorityHigh': todo.priority === 'alta',
    'priorityMedium': todo.priority === 'media',
    'priorityLow': todo.priority === 'bassa',

  };
}

}
