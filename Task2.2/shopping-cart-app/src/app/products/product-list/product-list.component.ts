import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../shared/models/product.model';
import * as CartActions from '../../state/cart/cart.actions';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();

  constructor(
    private store: Store,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ product, quantity: 1 }));
  }
}