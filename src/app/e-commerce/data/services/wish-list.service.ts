import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { wishList } from '../models/wish-list.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private http: HttpClient, private route: Router) {}

  wishListEmit = new Subject<any>();

  wishListServiceData: 'mangoproject/public/api/wishlist';

  addWishListData(data: Product) {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let url = `${baseUrl}` +  'mangoproject/public/api/wishlist';
    return this.http.post<wishList>(url, {
      user_id: userData.userId,
      product_id: data['id'],
    });
  }

  getWishListData() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let url = `${baseUrl}` +  'mangoproject/public/api/wishlist-display';
    return this.http.post<wishList>(url, { user_id: userData.userId });
  }

  removeProduct(id) {
    let url = `${baseUrl}` + 
      'mangoproject/public/api/wishlist-remove/' + id;
    return this.http.get<wishList>(url);
  }
}
