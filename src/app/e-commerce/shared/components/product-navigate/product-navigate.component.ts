import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Product } from 'src/app/e-commerce/data/models/product.model';
import { CartService } from 'src/app/e-commerce/data/services/cart.service';
import { CategoryService } from 'src/app/e-commerce/data/services/category.service';
import { ProductsService } from 'src/app/e-commerce/data/services/products.service';

@Component({
  selector: 'app-product-navigate',
  templateUrl: './product-navigate.component.html',
  styleUrls: ['./product-navigate.component.css'],
})
export class ProductNavigateComponent implements OnInit, OnDestroy {
  categoryData: [
    {
      id: number;
      name: string;
    }
  ];
  productsData:any ;
  products: [];
  categorySubscription: Subscription;
  productSubscription: Subscription;
  selectedIndex: number;
  defaultCategory: number;
  constructor(
    private categoryService: CategoryService,
    private productDataService: ProductsService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.categorySubscription = this.categoryService
      .getCategory()
      .subscribe((catData) => {
        this.categoryData = catData;
        this.defaultCategory = this.categoryData[0].id;
      });

    this.productSubscription = this.productDataService
      .getData(2)
      .pipe(
        map((data) => {
          return data['result']['data']['rows'];
        })
      )
      .subscribe((productData) => {
        this.productsData = productData;
        this.showProducts(productData[0].categories[0].id, 0);
      });
  }

  showProducts(id: number, index: number) {
    this.products = this.productsData.filter(
      (product) => product.categories[0].id === id
    );    
    this.selectedIndex = index;
  }

  addToCart( product:Product) {
    this.cartService.cart(product);
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
}
 