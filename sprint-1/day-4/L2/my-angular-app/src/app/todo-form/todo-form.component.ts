import { Component, Output, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from "uuid";
import { TaskServiceService } from '../task-service.service';
import { Task } from '../task';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  // counter : number = 0 
  // newTask : {title:string,description:string,completed:boolean,id: number}= {title:"",description:"",completed:false,id: 0}
  counter: number = 0;
  selectedPriority : string =""
  newTask: { title: string, description: string, completed: boolean, id: string,priority:string };
  constructor(private taskService:TaskServiceService){
    this.newTask = { title: '', description: '', completed: false, id: "",priority:"" };
    
  }
  setPriority(val:string){
    this.selectedPriority = val
    //console.log(this.selectedPriority)
  }
  onSubmit(event:Event){
   
    event.preventDefault()

    if(!this.newTask.title){
      alert("Please Enter A title")
      return 
    }

    this.counter++
    this.newTask.id =  uuidv4();
    this.newTask.priority = this.selectedPriority
    console.log(this.newTask)
    this.taskService.addTask(this.newTask.title,this.newTask.description,this.newTask.id,this.newTask.priority)
    this.taskAdded.emit(this.newTask);
    this.newTask.title=""
    this.selectedPriority=""
    this.newTask.description=""
  }
}
