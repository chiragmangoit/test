import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishListService } from '../../data/services/wish-list.service';

@Component({
  selector: 'app-whish-list',
  templateUrl: './whish-list.component.html',
  styleUrls: ['./whish-list.component.css'],
})
export class WhishListComponent implements OnInit, OnDestroy {
  constructor(private wishList: WishListService) {}

  wishListData:any = [];

  subscription: Subscription;

  deleteProduct(id) {
    this.wishList.removeProduct(id).subscribe();
    this.wishList.wishListEmit.next(this.wishList.getWishListData());
  }

  ngOnInit(): void {
    this.subscription = this.wishList.getWishListData().subscribe((data) => {
      this.wishListData = data.data;
    });
    this.wishList.wishListEmit.subscribe((data) => {
      data.subscribe(wishListProduct => {
        this.wishListData = wishListProduct.data;

      })      
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
