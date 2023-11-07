import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Provides a singleton instance
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  login() {
    this.loggedInSubject.next(true);
  }

  logout() {
    localStorage.setItem("logged",JSON.stringify({}))
    // Implement your logout logic here
    // After logging out, update the loggedInSubject
    this.loggedInSubject.next(false);
  }
  constructor() {
    // Check local storage for the initial login status upon service creation
    let check = localStorage.getItem("logged")
    let loggedUser = check ? JSON.parse(check) : {}
    if (loggedUser.name) {
      this.loggedInSubject.next(true); // Convert string to boolean
    }
  }
  isAuthenticated(): boolean {
    return this.loggedInSubject.value;
  }
}
