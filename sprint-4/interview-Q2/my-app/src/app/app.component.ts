import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'my-app';
   tasks:any[] = []
   archived :any[]=[]
   editing = false
   adding = false 
   taskToBeEdited: any={}
   taskToBeAdded:any={title:"",description:""}

   ngOnInit(): void {
     let checkTasks = localStorage.getItem("tasks")
     this.tasks = checkTasks ? JSON.parse(checkTasks) :[]
     let checkArchive = localStorage.getItem("archive")
     this.archived = checkArchive ? JSON.parse(checkArchive): []
   }

   editTask(id:string, editDetails:any){
   this.tasks= this.tasks.map((ele)=>ele.id === id ? {...ele,...editDetails}:ele)
   localStorage.setItem("tasks",JSON.stringify(this.tasks))
   alert("Task edited!")
   this.editing= false 
   }
   addTask(){
    this.tasks = [...this.tasks, {...this.taskToBeAdded,id:uuidv4()}]
    localStorage.setItem("tasks",JSON.stringify(this.tasks))
    alert("task added")
    this.adding = false 
   }
   deleteTask(id:string){
    this.tasks= this.tasks.filter((ele)=>ele.id!==id)
    localStorage.setItem("tasks",JSON.stringify(this.tasks))
   }

   archiveTask(id:string){
   let taskToBeArchived= this.tasks.filter((ele)=>ele.id === id)
   this.archived= [...this.archived,{...taskToBeArchived[0]}]
   localStorage.setItem("archive",JSON.stringify(this.archived))
   }

   setEditing(taskObj:any){
    this.editing = true 
    this.taskToBeEdited= {...taskObj}
   }

   setAdding(){
    this.adding= true 
   }
}
