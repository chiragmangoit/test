import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }

  getCategory() {
    return this.http.get<Category>(`${ baseUrl }` + "user-product/get-categories?page=1&pageSize=10").pipe(
      map( category => {
        return category['result']['data']['rows'];
      })
    )
  }

}
