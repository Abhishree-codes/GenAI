import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems : any[]=[]
  total = 0
  modalVisible = false 
//display fall back ui
//on checkout payment and shipping 

  getCartItems(){
    let data = localStorage.getItem("logged")
    let arr :any = data ? JSON.parse(data) : {};
    this.cartItems = [...arr?.cart]
  }
  getTotal(){
    this.total = this.cartItems.reduce((prev,curr)=>{
      return prev + (curr.price * curr?.quantity)
    },0)
    this.total = parseFloat((this.total).toFixed(2)); 
  }
  ngOnInit(): void {
    this.getCartItems()
    this.getTotal()
  }
  deleteFromCart(id:number){
    this.cartItems = this.cartItems.filter((ele:any)=>{
      return ele.id!==id
    })
    let data = localStorage.getItem("logged")
    let arr :any = data ? JSON.parse(data) : {};

    localStorage.setItem("logged",JSON.stringify({...arr,cart:this.cartItems}))
    this.getTotal()
    let usersArr = localStorage.getItem("users")
    let userData =  usersArr ? JSON.parse(usersArr): []

    let usersAfterAdding = userData.map((ele:any)=>{
     
      if(ele.id=== arr.id){
        return {...ele,cart:this.cartItems}
      }else{
        return ele 
      }
    })

    localStorage.setItem("users",JSON.stringify(usersAfterAdding))
  }
  increaseQuantity(item:any){
   
    
    this.cartItems= this.cartItems.map((ele:any)=>{
      if(ele.id === item.id){
        return {...ele,quantity:ele.quantity+1}
      }else{
        return ele
      }
    })
    this.getTotal()
    let data = localStorage.getItem("logged")
    let arr :any = data ? JSON.parse(data) : {};

    localStorage.setItem("logged",JSON.stringify({...arr,cart:this.cartItems}))
    let usersArr = localStorage.getItem("users")
    let userData =  usersArr ? JSON.parse(usersArr): []

    let usersAfterAdding = userData.map((ele:any)=>{
     
      if(ele.id=== arr.id){
        return {...ele,cart:this.cartItems}
      }else{
        return ele 
      }
    })

    localStorage.setItem("users",JSON.stringify(usersAfterAdding))
  }
  decreaseQuantity(item:any){
  
   
    
   this.cartItems= this.cartItems.map((ele:any)=>{
      if(ele.id === item.id){
        return {...ele,quantity:ele.quantity-1}
      }else{
        return ele
      }
    })
    this.getTotal()
    let data = localStorage.getItem("logged")
    let arr :any = data ? JSON.parse(data) : {};

    localStorage.setItem("logged",JSON.stringify({...arr,cart:this.cartItems}))
    let usersArr = localStorage.getItem("users")
    let userData =  usersArr ? JSON.parse(usersArr): []

    let usersAfterAdding = userData.map((ele:any)=>{
     
      if(ele.id=== arr.id){
        return {...ele,cart:this.cartItems}
      }else{
        return ele 
      }
    })

    localStorage.setItem("users",JSON.stringify(usersAfterAdding))
  }
  onCheckOut(){
    let date = new Date().toLocaleDateString()

    let data = localStorage.getItem("logged")
    let arr :any = data ? JSON.parse(data) : {};
    let id =uuidv4()
    localStorage.setItem("logged",JSON.stringify({...arr,cart:[],history:[...arr.history,{date,data:[...this.cartItems],total:this.total,id}]}))
   
    let usersArr = localStorage.getItem("users")
    let userData =  usersArr ? JSON.parse(usersArr): []
    let usersAfterAdding = userData.map((ele:any)=>{
     
      if(ele.id=== arr.id){
        return {...ele,cart:[],history:[...arr.history,{date,data:[...this.cartItems],total:this.total,id}]}
      }else{
        return ele 
      }
    })

    localStorage.setItem("users",JSON.stringify(usersAfterAdding))
    this.cartItems = []
    this.total=0
    //alert 
    alert(" Checkout Successful! Redirecting to Home")
    this.router.navigate(['/'])
  }

  openPaymentModal(){
    this.modalVisible = true 
  }
  closeModal(){
    this.modalVisible= false
  }
  constructor(private router:Router){

  }
}
