import { Component,OnInit } from '@angular/core';
import { CartProduct, Product } from '../product';
import { GetDataService } from '../get-data.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit{
  isNew = false
  products : Product[]= []

  async ngOnInit(): Promise<void> {
   
    try {
      let checking = localStorage.getItem("products")
      let arr = checking ? JSON.parse(checking):await this.getDataService.getProducts()
      
      let data = localStorage.getItem('cart')
      let storedData = data? JSON.parse(data): []
     this.products = arr.map((ele:Product)=>{
      const itemInCart= storedData.find((item:CartProduct)=>item.id === ele.id)
      if(itemInCart){
        return {...ele, cart:true}
      }else{
        return ele
      }
     })
    } catch (error) {
      console.log(error)
    }
   
  }

  checkIfNew(item:Product):boolean{
    const releaseDate = new Date(item.date)
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - releaseDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if(daysPassed<30){
      return true
    }else{
      return false
    }
  }
  checkIfInStock(item:Product){
    if(item.count == 0){
      return false
    }else{
      return true
    }
  }

  addToCart(id:number){

    this.products = this.products.map((ele)=>ele.id === id? {...ele,cart:true}:ele)
    let data = localStorage.getItem('cart');

    let arr :CartProduct[] = data ? JSON.parse(data) : [];
    let itemToAdd={}
    this.products.forEach((ele)=>{
      if(ele.id === id){
        itemToAdd = {...ele,quantity:1}
      }
    })
    localStorage.setItem("cart",JSON.stringify([...arr,{...itemToAdd}]))
    alert("Item Added to Cart!")
  }

  removeFromCart(id:number){
    this.products = this.products.map((ele)=>ele.id === id? {...ele,cart:false}:ele)
    let data = localStorage.getItem('cart');
    let arr :CartProduct[] = data ? JSON.parse(data) : [];
    arr= arr.filter((ele)=>ele.id!== id)
    localStorage.setItem("cart",JSON.stringify(arr))
  }
  

  constructor(private getDataService: GetDataService, private cartService: CartService){
    cartService.cartUpdated.subscribe((id:number)=>{
      this.products = this.products.map((ele)=>ele.id === id? {...ele,cart:false}:ele)  
    })
    cartService.cartCheckOut.subscribe((soldItems)=>{
      let arr = [...this.products]
      this.products = arr.map((ele:Product)=>{
   
        const itemMatch = soldItems.find((item)=>item.id===ele.id)
        if(itemMatch){
          console.log(itemMatch)
          return {...ele,cart:false,count:itemMatch.count}
        }else{
          return ele
        }
      })
      localStorage.setItem("products",JSON.stringify(this.products))
      localStorage.setItem("cart",JSON.stringify([]))
    })
  }
}
