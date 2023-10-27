import { Injectable } from '@angular/core';
import { Task } from './task';
import { DataPersistenceService } from './data-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  
  private tasks:Task[] = this.dataPersistenceService.getTasks();
  
  saveTasksLocally(tasks: Task[]): void {
    this.dataPersistenceService.saveTasks(tasks);
  }
  
  // // To retrieve tasks
  // getTasks(): Task[] {
  //   return this.dataPersistenceService.getTasks();
  // }

  getTasks(): Task[]{
    return this.tasks
  }

  addTask(title:string, description:string,id:string,priority:string){
  
    this.tasks.push({title,description,id,completed:false,priority})
    console.log(this.tasks)
    this.saveTasksLocally(this.tasks)
  }
  updateTask(id:string,updatedTask:Task){
    let tasksAfterUpdation= this.tasks.map((ele)=>ele.id===id? {...ele,...updatedTask}:ele)
    this.tasks = tasksAfterUpdation
     this.saveTasksLocally(this.tasks)
  }
  filterTaskByPriority(val:string){
    return this.tasks.filter((ele)=>ele.priority===val ? true :false)
  }
 updateTaskStatus(id:string,status:boolean){
  let tasksAfterUpdation = this.tasks.map((ele)=>ele.id===id?{...ele,completed:status}:ele)
  this.tasks = tasksAfterUpdation
   this.saveTasksLocally(this.tasks)
 }
  deleteTask(id: string){
    let tasksAfterDeleting  = this.tasks.filter((ele)=>ele.id!==id)
    this.tasks = tasksAfterDeleting
    this.saveTasksLocally(this.tasks)
  }
  filterTask(status:boolean){
    return this.tasks.filter((ele)=>ele.completed===status ? true :false)
  }
  constructor(private dataPersistenceService:DataPersistenceService){

  }

}
