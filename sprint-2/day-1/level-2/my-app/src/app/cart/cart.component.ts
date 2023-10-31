import { Component,OnInit } from '@angular/core';
import { CartProduct, Product } from '../product';
import { CartService } from '../cart.service';
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems :CartProduct[]=[]
total = 0

  ngOnInit():void{
  this.cartItems = this.cartService.getCartItems()
   this.getTotal()
  }
 
  getTotal(){
    this.total = this.cartItems.reduce((prev,curr)=>{
      return prev + (curr.price * curr.quantity)
    },0)
    this.total = parseFloat((123.456).toFixed(2)); 
  }

  deleteFromCart(id:number){
    this.cartItems = this.cartItems.filter((ele:CartProduct)=>{
      return ele.id!==id
    })
    localStorage.setItem("cart",JSON.stringify(this.cartItems))
    this.cartService.emitUpdateEvent(id)
    this.getTotal()
  }

  increaseQuantity(item:CartProduct){
    if(item.count-item.quantity<=0){
      alert("Cannot add more of this item")
    }else{
    
    this.cartItems= this.cartItems.map((ele:CartProduct)=>{
      if(ele.id === item.id){
        return {...ele,quantity:ele.quantity+1}
      }else{
        return ele
      }
    })
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartItems))
    }
  }
  decreaseQuantity(item:CartProduct){
    //check quan in html--> disable
   
    
   this.cartItems= this.cartItems.map((ele:CartProduct)=>{
      if(ele.id === item.id){
        return {...ele,quantity:ele.quantity-1}
      }else{
        return ele
      }
    })
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartItems))
  }
  onCheckOut(){
    //decrease count 
    //make quantity 0 
    //update local storage 
    //show checkout successful
    //update catalogue
    //make a post request 
    
   this.cartItems= this.cartItems.map((ele)=>{
      return {...ele, count: ele.count - ele.quantity}
    })
    this.cartItems.forEach((ele)=>{
      axios.post(`https://s2d2server.onrender.com/products/${ele.id}`,{count:+ele.count}).then((res)=>{
        console.log(res)
      }).catch((error)=>{
        console.log(error)
      })
    })
    localStorage.setItem("cart",JSON.stringify(this.cartItems))
    this.cartService.emitCheckoutEvent(this.cartItems)
    setTimeout(() => {
      this.router.navigate(['/']); // Replace '/' with the path to your home page
    }, 2000);
    alert("checkout successful! Redirecting to Home Page...")

  }
  constructor(private cartService:CartService,private router: Router){

  }
  
}
