import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItemCount } from './state/cart/cart.selectors';
import * as CartActions from './state/cart/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopping-cart-app';
  cartItemCount$: Observable<number> = new Observable<number>();
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    this.cartItemCount$ = this.store.select(selectCartItemCount);
    this.store.dispatch(CartActions.loadCartFromStorage());
  }
}