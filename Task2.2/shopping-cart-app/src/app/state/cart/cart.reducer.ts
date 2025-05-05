import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../shared/models/cart-item.model';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product, quantity }) => {
    const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex > -1) {
      // Item exists, update quantity
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      return { ...state, items: updatedItems };
    } else {
      // Item doesn't exist, add new item
      return {
        ...state,
        items: [...state.items, { product, quantity }]
      };
    }
  }),
  
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.product.id !== productId)
  })),
  
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    const updatedItems = state.items.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    return {
      ...state,
      items: updatedItems
    };
  }),
  
  on(CartActions.clearCart, state => ({
    ...state,
    items: []
  })),
  
  on(CartActions.loadCartFromStorage, (state) => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        return { ...state, items: parsedCart.items };
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    return state;
  })
);