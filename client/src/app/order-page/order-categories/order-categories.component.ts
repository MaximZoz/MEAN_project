import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { OrderService } from './../order.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss'],
})
export class OrderCategoriesComponent implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService,
    public order: OrderService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }
}
