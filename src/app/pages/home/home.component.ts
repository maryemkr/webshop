import { Product } from './../../models/product.model';
import { CartService } from './../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3
  rowHeight: number = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  productsSubscription: Subscription | undefined;
  products: Array<Product> | undefined;
  count = '24';
  sort = 'desc';
  constructor(private CartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts()
  }
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
  }
  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts()
  }
  onAddToCart(product: Product): void {
    this.CartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })

  }
  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

}
