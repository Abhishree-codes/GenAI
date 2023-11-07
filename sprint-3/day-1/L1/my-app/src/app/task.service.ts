import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  allTasks: Task[]=[]

  getTasks(){
    let checkTasks = localStorage.getItem("tasks")
    this.allTasks = checkTasks ? JSON.parse(checkTasks) : []

  }
  addTask(newTask:Task){
    this.allTasks = [...this.allTasks, {...newTask}]
    localStorage.setItem("tasks",JSON.stringify(this.allTasks))
  }
  deleteTask(id:string){
   this.allTasks= this.allTasks.filter((ele)=>{
      return ele.id!==id
    })
    localStorage.setItem("tasks",JSON.stringify(this.allTasks))
  }
  constructor() { }
}
