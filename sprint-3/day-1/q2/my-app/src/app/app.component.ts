import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  model={
    name:"",
    email:"",
    age:0
  }
  show= false 
  nameError=false
  ageError = false 
  validateAge(value:string){
    if(isNaN(+(value))){
      this.ageError= true 
      return 
    }
    this.ageError= false 
  }
  validateName(value:string){
    
    if(value.split("").includes("@")||value.split("").includes("!")||value.split("").includes("#")||value.split("").includes("$")||value.split("").includes("%")||value.split("").includes("^")||value.split("").includes("&")||value.split("").includes("*")||value.split("").includes("*")){
      this.nameError=true
      return 
    }

let flag = false

    value.split("").forEach((ele:any)=>{
      if(!isNaN(+(ele))){
        this.nameError=true 
    
        flag = true 
        return
      }
    })
    if(!flag){
      this.nameError=false
    }

  }
  handleSubmit(){
    this.show=true
  }
}
