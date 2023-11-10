import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Store } from '@ngrx/store';
import { cartProductStructure, productStructure } from '../app.reducer';
import { DECREASE_QUAN, INCREASE_QUAN, REMOVE } from '../app.actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { createSelector } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartData$: cartProductStructure[] = [];
  total = 0;

  constructor(private store: Store<{ appState: { data: any[], isAuth: boolean, cart: cartProductStructure[] } }>) { }

  ngOnInit() {
    // Use withLatestFrom to get the latest cart state when the cartData$ observable emits
    this.store.select(state => state.appState.cart).pipe(
      tap(value => this.cartData$ = value), // Update cartData$
      withLatestFrom(this.store.select(state => state.appState.cart)), // Combine with the latest cart state
    ).subscribe(([latestValue, latestCartState]) => {
      // This block will be executed after cartData$ and the cart state are updated

      this.getTotal();
    });
  }

  removeFromCart(id: string) {
    this.store.dispatch(REMOVE({ payload: id }));

  }

  increase(id: string) {
    this.store.dispatch(INCREASE_QUAN({ payload: id }));

  }

  decrease(id: string) {
    this.store.dispatch(DECREASE_QUAN({ payload: id }));

  }

  getTotal() {
    this.total = this.cartData$.reduce((prev, curr) => {
      return prev + (curr.price * curr.quantity);
    }, 0);
    this.total = parseFloat((this.total).toFixed(2));
  }
}
