import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user = {
    name:"",
    email:"",
    password:"",
    confirm:"",
    phone:"",
    date:"",
    picture:"",
    address:"",
    id:""
  }

  phoneError = false
  ageError = true
  passwordError=true
  confirmError=true
  pictureError=false
  nameError=false


  submitted = false
  validateName(value: string){

      const users = localStorage.getItem("users")
    const arr = users ? JSON.parse(users) : []
    let flag = true

    arr.forEach((ele:{
      name:"",
      email:"",
      password:"",
      confirm:"",
      phone:"",
      date:"",
      picture:"",
      address:"",
      id:"",
    })=>{
      if(ele.name === value && ele.id!==this.user.id){
        this.nameError= true
        flag = false
      }
    })
   
    if(flag){
      this.nameError=false
    }
   
  }
  validatePhone(number:string){
   if(!number){
    this.phoneError=false
   }else if(!/^\d{10}$/.test(number)){
    this.phoneError= true
   }else{
    this.phoneError=false
   }

  }
  onFileSelected(event:any){
    const file: File = event.target.files[0];
    const reader = new FileReader();
    if(!file){
      this.pictureError=false
    }else if(!file.type.startsWith("image/")){
      this.pictureError=true
    }
    else{
      reader.onload = (e) => {
        // Set the user's profile picture to the Data URL
       
        this.user.picture = e.target?.result as string
        
      };
      reader.readAsDataURL(file);
      this.pictureError=false
    }
  }
  validateAge(birthdate:string){


    const birthDate = new Date(birthdate);
    console.log(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

  age >= 18 ?   this.ageError= false: this.ageError=true
  }
  validateConfirm(value:string){
    if(value===this.user.password){
      this.confirmError=false
    }else{
      this.confirmError=true
    }
  }
  validatePassword(value:string){
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])/;
    if(pattern.test(value)){
      this.passwordError=false
    }else{
      this.passwordError=true
    }
  }
 onSubmit(){
  if(this.user.id===""){
    this.user = {...this.user,id:uuidv4()}
    const users = localStorage.getItem("users")
    const arr = users ? JSON.parse(users) : []
    localStorage.setItem("users",JSON.stringify([...arr,{...this.user}]))
   
    // this.user = {...this.user,id: Math.floor(Math.random() * 100)}
  }else{
    const users = localStorage.getItem("users")
    let arr = users ? JSON.parse(users) : []
   arr =  arr.map((ele:{
      name:"",
      email:"",
      password:"",
      confirm:"",
      phone:"",
      date:"",
      picture:"",
      address:"",
      id:"",
    })=>{
      if(ele.id===this.user.id){
        return {...ele,...this.user}
      }else{
        return ele 
      }
    })
    localStorage.setItem("users",JSON.stringify([...arr]))
  }
  this.submitted=true
  alert("Registration Successful!")
 }
 onEditClick(){
  this.submitted= false
 }
}



