import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../shared/models/cart-item.model';
import { selectCartItems, selectCartItemCount, selectCartTotal } from '../state/cart/cart.selectors';
import * as CartActions from '../state/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> = new Observable<CartItem[]>();
  itemCount$: Observable<number> = new Observable<number>();
  cartTotal$: Observable<number> = new Observable<number>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);
    this.itemCount$ = this.store.select(selectCartItemCount);
    this.cartTotal$ = this.store.select(selectCartTotal);
    
    // Load cart from localStorage when component initializes
    this.store.dispatch(CartActions.loadCartFromStorage());
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
    } else {
      this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
    }
  }

  removeItem(productId: number): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}