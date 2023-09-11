import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductsService } from 'src/app/e-commerce/data/services/products.service';


@Component({
  selector: 'app-product-detail-nav',
  templateUrl: './product-detail-nav.component.html',
  styleUrls: ['./product-detail-nav.component.css'],
})
export class ProductDetailNavComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private routes: ActivatedRoute
  ) {}

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  isMouseover = true;
  subscription:Subscription;
  productData:any;
  productId: number;
  date:Date = new Date();

  

  countStar(star: number) {
    this.isMouseover = false;
    this.selectedValue = star;
  }

  addClass(star: number) {
    if (this.isMouseover) {
      this.selectedValue = star;
    }
  }

  removeClass() {
    if (this.isMouseover) {
      this.selectedValue = 0;
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.selectedValue);
    
  } 
  
   formatAMPM() {
    var hours = this.date.getHours();
    var minutes:any = this.date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  ngOnInit(): void {
    this.routes.params.subscribe((params: Params) => {
      this.productId = +params['id'];
    });
    this.subscription = this.productsService.getProductDetails(
      this.productId
    ).subscribe((product) => {
      this.productData = [product['result']['productData']];
    });
  }
}
