import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import {  v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  taskToAdd={
    title:"",
    description:"",
    completed: false 
  }


  handleSubmit(){
    this.taskservice.addTask({...this.taskToAdd,id:uuidv4()})
    alert("Task Added!")
    this.taskToAdd={
      title:"",
      description:"",
      completed: false 
    }
  }

  constructor(private taskservice: TaskService){

  }
}
