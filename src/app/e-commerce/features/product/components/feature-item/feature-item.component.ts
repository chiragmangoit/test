import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/e-commerce/data/models/product.model';
import { CartService } from 'src/app/e-commerce/data/services/cart.service';
import { ProductsService } from 'src/app/e-commerce/data/services/products.service';
import { WishListService } from 'src/app/e-commerce/data/services/wish-list.service';

@Component({
  selector: 'app-feature-item',
  templateUrl: './feature-item.component.html',
  styleUrls: ['./feature-item.component.css'],
})
export class FeatureItemComponent implements OnInit, OnDestroy {
  productData: any;
  subscription: Subscription = new Subscription();
  page: number = 1;
  totalPages:number;

  constructor(
    private productDataService: ProductsService,
    private wishList: WishListService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.productDataService.getData(this.page).subscribe((product) => {
        this.productData = product['result']['data']['rows'];
        this.totalPages = Math.ceil(product['result']['data']['count']/10);
      })
    );
  }

  getProductData() {
    this.productDataService.getData(this.page).subscribe((product) => {
      this.productData = product['result']['data']['rows'];
    })
  }

  addToWishList(data: Product) {
    this.subscription.add(this.wishList.addWishListData(data).subscribe());
  }

  addToCart(product: Product) {
    this.cartService.cart(product);
  }

  pageSelector(pageSizeSelect: any) {
    this.page = pageSizeSelect;
    this.getProductData();
  }

  nextPage() {
    if(this.page < this.totalPages)
    this.page++;
    this.getProductData();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getProductData(); 
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
