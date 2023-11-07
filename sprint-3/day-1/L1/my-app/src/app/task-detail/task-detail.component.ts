import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit{
  taskId: any= ""
  task : Task={
    title:"",
    id:"",
    description:"",
    completed:false
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.taskId=params.get('id')
      
      let checkTasks = localStorage.getItem("tasks")
      let tasksToMap= checkTasks ? JSON.parse(checkTasks) : []
      tasksToMap.forEach((ele:Task)=>{
        if(ele.id === this.taskId){
          this.task = {...ele}
          return 
        }
      })
    })

    
  }

  constructor(private route: ActivatedRoute){

  }
}
