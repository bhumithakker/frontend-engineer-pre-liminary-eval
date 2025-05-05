import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectProductById = (id: number) => createSelector(
  selectAllProducts,
  (products) => products.find(product => product.id === id)
);