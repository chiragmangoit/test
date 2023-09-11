import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class RecommendedItemsService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<Product>(
      `${baseUrl}` + 'user-product/latest-product?option=mostView'
    );
  }
}
