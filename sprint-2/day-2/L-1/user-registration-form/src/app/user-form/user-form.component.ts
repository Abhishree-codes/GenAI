import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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
    phone:0
  }
  passwordError=true
  confirmError=true

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
  alert("Registration Successful!")
 }
}


function passwordStrengthValidator(control:AbstractControl):ValidationErrors|null{
  console.log(control.value)
  const password : string = control.value
  

  const upperCase = /[A-Z]/
  const lowerCase = /[a-z]/
  const digits = /\d/
  const specialChar = /[!@#\$%\^&\*]/

  const hasUpperCase = upperCase.test(password)
  const hasLowerCase = lowerCase.test(password)
  const hasDigits = digits.test(password)
  const hasSpecialChars = specialChar.test(password)

  if(hasUpperCase && hasLowerCase && hasDigits && hasSpecialChars){
    return null
  }
  return {passwordStrength: true}
}

function comparePasswords(control:AbstractControl):ValidationErrors|null{
  const passwordToCompare = control?.get("confirm")?.value 

  const password = control.get("password.value")
  if(passwordToCompare===password){
    return null
  }
  return {passwordNoMatch:true }
}

