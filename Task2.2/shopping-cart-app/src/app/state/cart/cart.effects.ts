import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom, map } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { selectCartState } from './cart.selectors';

@Injectable()
export class CartEffects {
  saveCart$ = createEffect(() => this.actions$.pipe(
    ofType(
      CartActions.addToCart,
      CartActions.removeFromCart,
      CartActions.updateQuantity,
      CartActions.clearCart
    ),
    withLatestFrom(this.store.select(selectCartState)),
    tap(([action, state]) => {
      localStorage.setItem('cart', JSON.stringify(state));
    }),
    map(() => CartActions.saveCartSuccess())
  ));

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}