import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newTask: string = ''; // Dichiarazione della proprietà newTask
  tasks: string[] = []; // Dichiarazione della proprietà tasks

  addTask() {
    // Logica per aggiungere una nuova attività
  }

  removeTask(index: number) {
    // Logica per rimuovere un'attività
  }
}
