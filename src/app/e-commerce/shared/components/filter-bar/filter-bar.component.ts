import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryService } from 'src/app/e-commerce/data/services/category.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  categorySubscription: Subscription;
  categoryData: any;
  selectedIndex: number;
  defaultCategory: number;


  constructor( private categoryService: CategoryService,) {}

  ngOnInit(): void {
    this.categorySubscription = this.categoryService
    .getCategory()
    .subscribe((catData) => {
      this.categoryData = catData;
      this.defaultCategory = this.categoryData[0].id;
    });
  }

  showProducts(id: number, index: number) {
    // this.products = this.productsData.filter(
    //   (product) => product.categories[0].id === id
    // );    
    console.log(index);
    
    this.selectedIndex = index;
  }

  public someRange2: number[] = [40, 350];
  someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    tooltips: [true, true],
    start: [0, 600],
    step: 1,
    range: {
      min: 0,
      max: 600,
    },
  };
}
