import { StoreService } from 'src/app/services/store.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: string[] | undefined;
  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.storeService.getAllCategories().subscribe((response: Array<string>) => {
      this.categories = response;
    });
  }
  onShowCategory(category: string): void {
    this.showCategory.next(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
