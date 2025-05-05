import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    mergeMap(() => this.productService.getAllProducts().pipe(
      map(products => ProductActions.loadProductsSuccess({ products })),
      catchError(error => of(ProductActions.loadProductsFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}