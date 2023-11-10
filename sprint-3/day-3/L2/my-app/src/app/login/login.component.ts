import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { LOGIN } from '../app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLogin={
    email:"",
    password:""
  }
  isCompanyAccount: boolean = false;
  register = false 
  login = true 
  user = {
    name:"",
    email:"",
    password:"",
    confirm:"",
    phone:"",
    date:"",
    picture:"",
    address:"",
    id:"",
    companyName:"",
    companyIndustry:"",
    companySize:""
  }

  phoneError = false
  ageError = true
  passwordError=true
  confirmError=true
  pictureError=false
  nameError=false
  loginNameError=false
  loginPasswordError = false 
  submitted = false

  handleShowCompany(){
    this.isCompanyAccount= !this.isCompanyAccount
    console.log(this.isCompanyAccount)
  }
  validateLoginName(value:string){
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
      if(ele.email === value){
        flag = false
      }
    })
    if(!flag){
      this.loginNameError=false
    }else{
      this.loginNameError=true
    }
  }
  validateLoginPassword(value:string){
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
      if(ele.password === value){
        flag = false
      }
    })
    if(!flag){
      this.loginPasswordError=false
    }else{
      this.loginPasswordError=true
    }
  }
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
    //check if email already exists 

    this.user = {...this.user,id:uuidv4()}
    const users = localStorage.getItem("users")
    const arr = users ? JSON.parse(users) : []
    localStorage.setItem("users",JSON.stringify([...arr,{...this.user, cart:[],history:[]}]))
   
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
  this.register= false 
  this.login= true 
 }
 onEditClick(){
  this.submitted= false
 }
 onSubmitLogin(){
  const users = localStorage.getItem("users")
  const arr = users ? JSON.parse(users) : []
  let flag = false 
  let invalid = false
  let loggedUser ={} 
  arr.forEach((ele:any)=>{
    if(ele.email === this.userLogin.email){
      flag = true 
      if(ele.password === this.userLogin.password){
       
       loggedUser = {...ele}
      }else{
        alert("Invalid Password")
        invalid = true
        flag = false 
        return 
      }
    }
  })
  if(loggedUser && flag){

    localStorage.setItem("logged",JSON.stringify(loggedUser))
    this.router.navigate(['/']);


    this.store.dispatch(LOGIN())
    
  }else if(!flag && !invalid){
    alert("user doesn't exist!")
  }
 }
 showRegister(){
  this.register= true 
  this.login=false 
 }
 showLogin(){
  this.register = false 
  this.login = true 
 }
 constructor(private router: Router,private store: Store<{ appState: {isAuth:boolean} }>){

 }
}
