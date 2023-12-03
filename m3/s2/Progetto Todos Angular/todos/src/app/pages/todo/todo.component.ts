import { Observer } from 'rxjs';
import { TodoService } from '../../todos.service';
import { ITodo } from './../../Models/itodo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todos: ITodo[]=[];
  isLoading: boolean = true;

  constructor(private todoSvc: TodoService){
}

ngOnInit (): void {
  this.fetchTodos();
}

fetchTodos(): void {
  this.isLoading = true; // Imposta isLoading su true prima di effettuare la chiamata
  this.todoSvc.getAll().subscribe({
    next: (data: { pendingTodos: ITodo[]; }) => {
      this.todos = data.pendingTodos;
      this.isLoading = false; // Imposta isLoading su false dopo aver ottenuto i dati
    },
    error: (error) => {
      console.error('Si è verificato un errore nel recupero dei post attivi:', error);
      this.isLoading = false; // Assicurati di impostare isLoading su false anche in caso di errore
    }
  });
}


toggleTodoStatus(todo: ITodo): void {
  console.log(todo);
  todo.completed = !todo.completed;
  todo.completedAt = new Date();
  this.todoSvc.toggleCompleted(todo).subscribe(updatedTodo => {
    console.log(updatedTodo);
    this.todos = this.todos.filter(todo => todo.id !== updatedTodo.id);
  });
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

onTodoCreated(newTodo: ITodo): void {
  console.log(newTodo);
  this.todos.push(newTodo);

}
selectedTodoForEditVisible: boolean = false;
selectedTodoForEdit: ITodo | null = null;

onEdit(todo: ITodo): void {
  this.selectedTodoForEdit = { ...todo };
  this.selectedTodoForEditVisible = true; // Mostra il form di modifica
}


onSaveChanges(id: number, title: string, priority:string): void {
  if (this.selectedTodoForEdit) {
    this.selectedTodoForEdit.id = id;
    this.selectedTodoForEdit.title = title;
    this.selectedTodoForEdit.edit = new Date;
    this.selectedTodoForEdit.priority = priority;

    this.todoSvc.update(this.selectedTodoForEdit).subscribe({
      next: updatedTodo => {
        console.log('Todo aggiornato con successo:', updatedTodo);
        this.selectedTodoForEdit = null;

        // Trova e aggiorna il todo nella lista locale 'todos'
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = { ...updatedTodo };
        }
      },
      error: error => {
        console.error('Si è verificato un errore durante l\'aggiornamento del todo:', error);
      }
    });
  }
}



getClassObj(todo: ITodo){
  return {
    'priorityHigh': todo.priority === 'alta',
    'priorityMedium': todo.priority === 'media',
    'priorityLow': todo.priority === 'bassa',

  };
}



}
