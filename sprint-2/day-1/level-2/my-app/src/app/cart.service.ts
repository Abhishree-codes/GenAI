import { EventEmitter, Injectable } from '@angular/core';
import { CartProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartProduct[] = [];
  cartUpdated : EventEmitter<number>= new EventEmitter<number>()
  cartCheckOut : EventEmitter<CartProduct[]>=new EventEmitter<CartProduct[]>()
  getCartItems(){
    let data = localStorage.getItem("cart")
    let arr :CartProduct[] = data ? JSON.parse(data) : [];
    this.cartItems = [...arr]
    return this.cartItems
  }
  emitUpdateEvent(id:number){
    this.cartUpdated.emit(id)
  }
  emitCheckoutEvent(soldItems:CartProduct[]){
    this.cartCheckOut.emit(soldItems)
  }

  constructor() { }
}
