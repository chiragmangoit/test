import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Banner } from '../models/banner.model';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private http: HttpClient) {}

  getBanner() {
    return this.http.get<Banner>(
      `${baseUrl}` + 'admin-banner/get-banners'
    );
  }
}
