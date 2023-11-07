import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit{
  tasks: Task[]=[]

  ngOnInit(): void {
   this.taskservice.getTasks()
   this.tasks = this.taskservice.allTasks
  }
  
  handleDelete(id:string){
    this.taskservice.deleteTask(id)
    this.tasks = this.taskservice.allTasks
    alert("Task Deleted!")
  }

  handleViewDetails(id:string){
    this.router.navigate([`/task/${id}`])
  }
  constructor(private taskservice: TaskService,private router: Router){

  }
}
