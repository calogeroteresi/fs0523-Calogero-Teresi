import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'tasks';

  constructor() {}

  getTasks(): { description: string; completed: boolean }[] {
    const tasksData = localStorage.getItem(this.storageKey);
    return tasksData ? JSON.parse(tasksData) : [];
  }

  addTask(newTask: { description: string; completed: boolean }): void {
    if (this.isValidTask(newTask)) {
      const tasks = this.getTasks();
      tasks.push(newTask);
      this.saveTasks(tasks);
    } else {
      // Gestione dell'errore per dati non validi
      console.error('Dati dell\'attività non validi');
    }
  }

  removeTask(taskIndex: number): void {
    const tasks = this.getTasks();
    tasks.splice(taskIndex, 1);
    this.saveTasks(tasks);
  }

  updateTask(taskIndex: number, updatedTask: { description: string; completed: boolean }): void {
    if (this.isValidTask(updatedTask)) {
      const tasks = this.getTasks();
      tasks[taskIndex] = updatedTask;
      this.saveTasks(tasks);
    } else {
      // Gestione dell'errore per dati non validi
      console.error('Dati dell\'attività non validi');
    }
  }

  private saveTasks(tasks: { description: string; completed: boolean }[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  private isValidTask(task: { description: string; completed: boolean }): boolean {
    // Verifica se la descrizione non è vuota e contiene almeno 3 caratteri
    return task.description.trim() !== '' && task.description.trim().length >= 3;
  }
  
}
