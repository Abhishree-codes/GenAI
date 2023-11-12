import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGOUT } from '../app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{
  isLoggedIn: boolean=false

  
  handleLogin(){
    //direct to login
    this.router.navigate(['/login'])
  }
  handleLogOut(){
    console.log(this.isLoggedIn)
   this.store.dispatch(LOGOUT())
  }
  
  handleDirectToCart(){
    if(!this.isLoggedIn){
      alert("Please login first")
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(['/cart'])
    }
  }
  constructor(private router: Router, private store: Store<{ appState: { isAuth: boolean } }>) {
    // Use select directly without subscribing if you only want to get the initial value
    this.store.select(state => state.appState.isAuth).subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  
}
