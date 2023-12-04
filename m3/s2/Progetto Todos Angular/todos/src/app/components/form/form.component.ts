import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo } from '../../Models/itodo';
import { TodoService } from '../../todos.service';

@Component({
  selector: '.app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  newTodo: Partial<ITodo> = {};
  @Output() todoCreated = new EventEmitter<ITodo>(); // Definizione dell'evento Output

  constructor(private todoSvc: TodoService, private router: Router) {}

  oldPost: ITodo | null = null;
  loading: boolean = false;

  onSubmit() {
    this.loading = true;
    this.newTodo.completed = false;
    this.newTodo.createdAt = new Date();

    this.todoSvc.create(this.newTodo)
      .subscribe(createdTodo => {
        console.log('Post creato:', createdTodo);
        this.oldPost = createdTodo;
         setTimeout(()=>{
         this.loading = false;
         this.oldPost = null;
       },3000)
        this.todoCreated.emit(createdTodo); // Emetti l'evento per notificare al genitore
      });
  }
}
