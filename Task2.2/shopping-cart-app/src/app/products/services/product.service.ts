import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: 699.99, description: 'Latest smartphone model' },
    { id: 3, name: 'Headphones', price: 149.99, description: 'Noise-cancelling headphones' },
    { id: 4, name: 'Tablet', price: 399.99, description: '10-inch tablet with retina display' },
    // more products...
  ];

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    // Simulate API delay
    return of(this.products).pipe(delay(500));
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id)).pipe(delay(500));
  }
}