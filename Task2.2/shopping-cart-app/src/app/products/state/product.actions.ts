import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models/product.model';

export const loadProducts = createAction('[Products] Load');
export const loadProductsSuccess = createAction(
  '[Products] Load Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Failure',
  props<{ error: any }>()
);