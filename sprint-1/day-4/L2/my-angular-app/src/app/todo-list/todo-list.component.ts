import { Component, Input,OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { Task } from '../task';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  
  @Input() newTask: Task = { id: "", title: '', description: '', completed: false,priority:"" };
  tasks: Task[] = [];
  editingTask :Task ={ id: "", title: '', description: '', completed: false,priority:"" };
  selectedValue: string = '';
  editedPriority:string = ""
  selectedPriorityFilterValue = ""

  markDone(id:string){
    this.taskService.updateTaskStatus(id,true)
    this.tasks = this.taskService.getTasks(); 
  }
  editTask(task:Task){
    this.editingTask= {...task}
  }
  deleteTaskFromlist(id:string){
    this.taskService.deleteTask(id)
    this.tasks= this.taskService.getTasks()
  }
  implementFilter(filterVal:string){
    if(filterVal===""){
      this.tasks= this.taskService.getTasks()
    }else if(filterVal ==="true"){
      this.tasks = this.taskService.filterTask(true)
    }else{
      this.tasks = this.taskService.filterTask(false)
    }
    this.selectedValue = filterVal;
  }
  setEditedPriority(val:string){
    this.editingTask.priority = val
  }
  implementPriorityFilter(priorityVal:string){
    if(priorityVal===""){
      this.tasks= this.taskService.getTasks()
    }else if(priorityVal ==="High"){
      this.tasks = this.taskService.filterTaskByPriority("High")
    }else if(priorityVal ==="Low"){
      this.tasks = this.taskService.filterTaskByPriority("Low")
    }else{
      this.tasks = this.taskService.filterTaskByPriority("Medium")
    }
    this.selectedPriorityFilterValue = priorityVal;
  }
  onEditSubmit(event:Event){
    event.preventDefault()
    this.taskService.updateTask(this.editingTask.id,this.editingTask)
    alert("Task Edited Successfully!")
    this.editingTask ={ id: "", title: '', description: '', completed: false ,priority:""};
    this.tasks = this.taskService.getTasks(); 
  }
  constructor(private taskService: TaskServiceService) {
    this.tasks = taskService.getTasks();

  }
}