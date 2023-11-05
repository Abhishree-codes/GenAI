import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
isLoggedIn= false 

ngOnInit(): void {
  this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
    this.isLoggedIn = loggedIn;
  });
}

handleLogin(){
  //direct to login
  this.router.navigate(['/login'])
}
handleLogOut(){
  this.authService.logout();
}
handleDirectToCart(){
  if(!this.isLoggedIn){
    alert("Please login first")
    this.router.navigate(['/login'])
  }else{
    this.router.navigate(['/cart'])
  }
}

constructor(private router: Router,private authService: AuthService){

}

}