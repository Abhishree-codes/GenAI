import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ADD_TO_CART, GET_PRODUCTS } from '../app.actions';
import { productStructure } from '../app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products$:any[]=[]
  isLogged$:boolean=false
  cartData$:any[]=[]

  ngOnInit(): void {
    this.http.get("https://fakestoreapi.com/products").subscribe((data)=>{
    this.store.dispatch(GET_PRODUCTS({payload: data}))

    },(error:any)=>{
     console.log(error)
    })
  }

  addToCart(productToAdd:productStructure){
if(!this.isLogged$){
  alert("Please login first")
  this.router.navigate(['/login'])
  return 
}

let flag = false 
this.cartData$.forEach((ele:any)=>{
  if(ele.id === productToAdd.id){
    alert("Item is already in cart")
    flag = true 
    return 
  }
})

if(!flag){
  this.store.dispatch(ADD_TO_CART({payload:productToAdd}))
}

  }

  constructor(private http: HttpClient,private store: Store<{ appState: {data:any[],isAuth:boolean,cart:productStructure[]} }>,private router: Router){
  this.store.select(state => state.appState.isAuth).subscribe(value => {
      this.isLogged$ = value;
    });
    this.store.select(state => state.appState.data).subscribe(value => {
      this.products$ = value;
    });
    this.store.select(state => state.appState.cart).subscribe(value => {
      this.cartData$ = value;
    });
  }
}
