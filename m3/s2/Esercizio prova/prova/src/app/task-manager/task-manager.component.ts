import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  tasks: { description: string; completed: boolean }[] = [];
  newTask: { description: string; completed: boolean } = { description: '', completed: false };
  editedTask: { description: string; completed: boolean } = { description: '', completed: false };
  editTaskIndex: number | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasksFromStorage();
  }

  loadTasksFromStorage(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    } else {
      this.loadTasks(); // Se non ci sono attività salvate, carica quelle di default dal servizio
    }
  }

  updateTasksInStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }
  
  addTask(): void {
    if (this.newTask.description.trim() !== '') {
      this.taskService.addTask(this.newTask);
      this.updateTasksInStorage(); // Aggiorna il localStorage
      this.newTask = { description: '', completed: false };
      this.loadTasksFromStorage(); // Carica di nuovo i task dopo l'aggiunta
    }
  }
  

  removeTask(taskIndex: number): void {
    this.taskService.removeTask(taskIndex);
    this.loadTasks(); // Aggiorna la lista delle attività dopo la rimozione
    this.updateTasksInStorage(); // Aggiorna le attività nel localStorage
  }
  // Aggiornamento delle attività nel localStorage dopo ogni modifica
  
  cancelEdit(): void {
    this.editTaskIndex = null;
    this.editedTask = { description: '', completed: false };
  }


  updateTask(): void {
    if (this.editTaskIndex !== null) {
      this.taskService.updateTask(this.editTaskIndex, this.editedTask);
      // Aggiorna solo la task specifica nell'array tasks invece di richiamare getTasks()
      this.tasks[this.editTaskIndex] = this.editedTask;
      this.updateTasksInStorage(); // Aggiorna le attività nel localStorage
      this.cancelEdit();
    }
  }
}  
