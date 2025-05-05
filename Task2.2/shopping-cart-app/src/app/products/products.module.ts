import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductListComponent } from './product-list/product-list.component';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';

const routes: Routes = [
  { path: '', component: ProductListComponent }
];

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductsModule { }