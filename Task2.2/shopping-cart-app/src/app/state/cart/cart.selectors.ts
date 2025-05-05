import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
);

export const selectCartItemById = (productId: number) => createSelector(
  selectCartItems,
  (items) => items.find(item => item.product.id === productId)
);