import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn= false 
  public navLinks = [
    { label: 'Home', path: '/' },
    { label: 'User Profiles', path: '/user-profiles' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    {label:'Cart',path:'/cart'}
    // Add more links as needed
  ];
  handleLogin(){
    //direct to login
    this.router.navigate(['/login'])
  }
  handleLogOut(){
    this.authService.logout();
  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }
  isAuthorized(link: { label: string, path: string }): boolean {
    if(link.path === '/user-profiles'){

       return this.isLoggedIn; 
    }

    return true 
  
  }

  constructor(private router: Router,private authService: AuthService) {
    // You can use the router service to access the current route and check authentication status if needed.
  }
}
