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

  constructor(private todoSvc: TodoService){
}

ngOnInit (): void {
  this.fetchTodos();
}

fetchTodos(): void {
  this.todoSvc.getAll().subscribe({
    next: (data: { pendingTodos: ITodo[]; }) => {
      this.todos = data.pendingTodos;
    },
    error: (error) => {
      console.error('Si è verificato un errore nel recupero dei post attivi:', error);
    }
  } as Observer<any>);
}

toggleTodoStatus(todo: ITodo): void {
  console.log(todo);
  todo.completed = !todo.completed;
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


onSaveChanges(id: number, title: string): void {
  if (this.selectedTodoForEdit) {
    this.selectedTodoForEdit.id = id;
    this.selectedTodoForEdit.title = title;
    this.selectedTodoForEdit.edit = new Date;

    this.todoSvc.update(this.selectedTodoForEdit).subscribe({
      next: updatedTodo => {
        console.log('Todo aggiornato con successo:', updatedTodo);
        this.selectedTodoForEdit = null;
      },
      error: error => {
        console.error('Si è verificato un errore durante l\'aggiornamento del todo:', error);
      }
    });
  }
}



}
