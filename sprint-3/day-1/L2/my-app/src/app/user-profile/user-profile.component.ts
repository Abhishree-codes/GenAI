import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
 //editing ui 
  //email check for duplicate 
  
  editing = false 
  formData = {
    name:"",
    picture:"",
    address:"",
    date:"",
    email:"",
    phone:"",
    history:[{date:"",data:[{title:"",image:"",price:"",quantity:""}],    total:"",id:""}],
    cart:[],
    confirm:"",
    password:"",
    id:""
  }
  userData = {
    name:"",
    picture:"",
    address:"",
    date:"",
    email:"",
    phone:"",
    history:[{date:"",data:[{title:"",image:"",price:"",quantity:""}],    total:"",id:""}],
    cart:[],
    confirm:"",
    password:"",
    id:""
  }
  phoneError = false
  ageError = false
  pictureError=false
  nameError=false

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
    if(ele.name === value && ele.id!==this.formData.id){
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
     
      this.formData.picture = e.target?.result as string
      
    };
    reader.readAsDataURL(file);
    this.pictureError=false
  }
}

validateAge(birthdate:string){


  const birthDate = new Date(birthdate);
 
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


 onEditClick(){
  this.editing= true
  this.formData = {...this.userData}
 }

 onSubmit(){
  this.userData = {...this.formData}
  localStorage.setItem("logged",JSON.stringify(this.userData))
  const checkUsersArr= localStorage.getItem("users")
  let usersData = checkUsersArr ? JSON.parse(checkUsersArr) :[]
  usersData = usersData.map((ele:any)=>{
    if(ele.id === this.userData.id){
      return {...ele,...this.userData}
    }else{
      return ele
    }
  })
  localStorage.setItem("users",JSON.stringify(usersData))
  this.editing = false 
  alert("Details edited!")
 }

  getUserData(){
    const check= localStorage.getItem("logged")
    const loggedInUser = check ?  JSON.parse(check) :{}

    this.userData = {...loggedInUser}

  }

  ngOnInit(): void {
    this.getUserData()
  }
}
