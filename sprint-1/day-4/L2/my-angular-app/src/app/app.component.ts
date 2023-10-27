import { Component } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
   newTask: Task={ id: "", title: '', description: '', completed: false,priority:"" };
   onTaskAdded(task: Task) {
    this.newTask = task;
  }
}
