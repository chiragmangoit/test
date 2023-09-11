import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ProductDetails } from '../models/product-details.model';
import { Subject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {


  constructor(private http: HttpClient) {}

  getData(pageNo:number) {
    let url = `${baseUrl}user-product/get-all-products?page=${pageNo}&pageSize=10`;
    return this.http.get<Product>(url);
  }

  getHomeFeatureData() {
    let url =
    `${baseUrl}` + 'user-product/feature-product';
    return this.http.get<Product>(url);
  }

  getProductDetails(id: number) {
    let url = `${baseUrl}` + 
      'user-product/product-details/' + id;
    return this.http.get<ProductDetails>(url);
  }

}
